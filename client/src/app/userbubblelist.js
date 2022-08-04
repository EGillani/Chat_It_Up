import { List, Paper } from "@mui/material";
import UserBubble from "./userbubble";
//using idx property since the list has to have unique identifiers
const UserBubbleList = (props) => {
  let messages = props.messages.map((message, idx) => {
    return (
      <UserBubble
        key={idx}
        message={message}
        chatName={props.chatName}
        roomName={props.roomName}
      />
    );
  });
  return (
    // <Paper style={{height: "78vh", width: "100%", overflow: "auto"}}>
    <List
      style={{
        marginTop: "1vh",
        marginBottom: "1vh",
        marginLeft: "1vw",
        alignContent: "center",
        alignItems: "center",
        boxSizing : "border-box",
        height: "calc(65vh)",
        overflow: "auto",
      }}
    >
      {messages}
    </List>
  );
};
export default UserBubbleList;
