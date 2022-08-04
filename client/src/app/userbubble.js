import { useEffect, useRef } from "react";
import { ListItem } from "@mui/material";
import Bubble from "./bubble";
import Triangle from "./triangle";
import "./App.css"
const UserBubble = (props) => {
  const userRef = useRef(null);
  useEffect(() => {
    userRef.current.scrollIntoView(true);
  }, []);
  return (
    <div className="userListItem">
      <ListItem
        ref={userRef}
      >
        <Bubble message={props.message} chatName={props.chatName} roomName={props.roomName} />
        <Triangle message={props.message}  chatName={props.chatName}/>
      </ListItem>
      <p></p>
    </div>
  );
};
export default UserBubble;
