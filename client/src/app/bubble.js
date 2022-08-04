import "./App.css";
const Bubble = (props) => {
  let msg = props.message;

  return (
    <div
      className="userBubble"
      style={{
        backgroundColor: msg.colour,
        left: msg.from !== props.chatName || msg.from === "Admin" ? "3vw" : "40vw",

      }}
    >
      <div className="scenario-header">
        <div style={{ float: "left" }}>{msg.from} Says:</div>
        <div style={{ float: "right" }}>room: {props.roomName} </div>
      </div>
      <div className="scenario-header" style={{padding: "0.5vh"}}>
        <div style={{ float: "right", paddingRight: "1vh" }}>@:{msg.timeStamp} </div>
      </div>
      <div className="scenario-message">
      <div style={{ float: "left"}}>{msg.text}</div>
      </div>
    </div>
  );
};
export default Bubble;
