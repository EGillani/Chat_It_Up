import { useReducer, useEffect, useState } from "react";
import io from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import theme from "./theme";
import img from "./chaticon.png";
import "./App.css";
import TopBar from "./topbar";
import UserBubbleList from "./userbubblelist";
import DialogTable from "./dialogtable";
import RadioButtonGroup from "./radiobuttons";
const ChatApp = () => {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => setOpen(false);
  const initialState = {
    messages: [],
    nameStatus: "enter a unique chat name",
    roomStatus: "enter a room name",
    rooms: [],
    radioStatus: "",
    showjoinfields: true,
    alreadyexists: false,
    chatName: "",
    roomName: "",
    typingMsg: "",
    isTyping: false,
    message: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    serverConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [state.rooms]);

  const serverConnect = () => {
    //connect to server
    const socket = io.connect("localhost:5000", {
      forceNew: true,
      transports: ["websocket"],
      autoConnect: true,
      reconnection: false,
      timeout: 5000,
    });
    //HEROKU ADD ON
    // const socket = io.connect();

    socket.on("rooms", onRooms);
    socket.on("nameexists", onExists);
    socket.on("welcome", addMessage);
    socket.on("someonejoined", addMessage);
    socket.on("someoneleft", addMessage);
    socket.on("someoneistyping", onTyping);
    socket.on("newmessage", onNewMessage);
    socket.on("roomsandusers", onRoomsAndUsers);
    setState({ socket: socket });
  };
  //get room details for radioButtons
  const onRooms = (dataFromServer) => {
    setState({
      rooms: [...dataFromServer.rooms],
    });
  };
  //get user details for dialog box
  const onRoomsAndUsers = (dataFromServer) => {
    setState({
      users: dataFromServer.users,
    });
  };

  const onTyping = (dataFromServer) => {
    if (dataFromServer.from !== state.chatName) {
      setState({
        typingMsg: dataFromServer.text,
      });
    }
  };

  //check if name already exists
  const onExists = (dataFromServer) => {
    setState({ nameStatus: dataFromServer.text });
  };
  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: state.chatName }, (err) => {});
      setState({ isTyping: true }); // flag first byte only
    }
  };

  const onNewMessage = (dataFromServer) => {
    addMessage(dataFromServer);
    setState({ typingMsg: "" });
  };
  // generic handler for all other messages:
  const addMessage = (dataFromServer) => {
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({
      messages: messages,
      showjoinfields: false,
      alreadyexists: false,
    });
  };
  // enter key handler to send message
  const handleSendMessage = (e) => {
    if (state.message !== "") {
      state.socket.emit(
        "message",
        { from: state.chatName, text: state.message },
        (err) => {}
      );
      setState({ isTyping: false, message: "" });
    }
  };
  // handler for join button click
  const handleJoin = () => {
    state.socket.emit("join", {
      chatName: state.chatName,
      roomName: state.roomName,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <TopBar viewDialog={handleOpenDialog} state={state} setState={setState} />
      <Dialog open={open} onClose={handleCloseDialog} style={{ margin: 20 }}>
        <DialogTitle
          style={{ textAlign: "center", color: "theme.palette.primary.dark" }}
        >
          <Typography
            style={{
              color: theme.palette.primary.dark,
              fontSize: "large",
            }}
          >
            Who's On?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogTable users={state.users}></DialogTable>
        </DialogContent>
      </Dialog>
      {state.showjoinfields && (
        <Card>
          <CardMedia style={{ marginTop: "1vh", textAlign: "center" }}>
            <img src={img} alt="logo" width="16%" height="16%" />
          </CardMedia>
          <CardHeader
            title="Sign In"
            style={{ color: theme.palette.primary.main, textAlign: "center" }}
          />
          <CardContent style={{ textAlign: "center" }}>
            <div>
              <TextField
                onChange={(e) => {
                  setState({ chatName: e.target.value, nameStatus: "" });
                }}
                placeholder="Enter chat name"
                autoFocus={true}
                required
                value={state.chatName}
                error={state.nameStatus !== "" || state.chatName === ""}
                helperText={state.nameStatus}
              />
              <RadioButtonGroup
                rooms={state.rooms}
                setState={setState}
                radioStatus={state.radioStatus}
              ></RadioButtonGroup>
              <TextField
                onChange={(e) => {
                  setState({ roomName: e.target.value, roomStatus: "" });
                }}
                placeholder="Enter room name"
                required
                value={state.roomName}
                error={state.roomStatus !== "" || state.roomName === ""}
                helperText={state.roomStatus}
              />
              <br></br>
              <Button
                variant="contained"
                data-testid="submit"
                color="primary"
                style={{ marginLeft: "2vh", marginTop: "1vh" }}
                onClick={() => handleJoin()}
                disabled={state.chatName === "" || state.roomName === ""}
              >
                Join
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {!state.showjoinfields && (
        <div className="scenario-container">
          <UserBubbleList
            messages={state.messages}
            chatName={state.chatName}
            roomName={state.roomName}
          ></UserBubbleList>
          <div style={{ marginTop: "1vh", padding: "3vw" }}>
            <TextField
              style={{ float: "left" }}
              onChange={onMessageChange}
              placeholder="type something here"
              autoFocus={true}
              value={state.message}
              onKeyPress={(e) =>
                e.key === "Enter" ? handleSendMessage() : null
              }
            />
            <Typography color="primary" style={{ float: "right" }}>
              {state.typingMsg}
            </Typography>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};
export default ChatApp;
