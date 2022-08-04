const Triangle = (props) => {
  let msg = props.message;
  return (
    <div
      style={{
        content: "" /* triangle */,
        position: "absolute",
        bottom: "-2vh" /* value = - border-top-width - border-bottom-width */,
        //left:  props.alignTriangle,
        left: (msg.from !== props.chatName || msg.from === "Admin") ? "8vw" : "80vw" ,
        borderWidth:
          "15px 15px 0" /* vary these values to change the angle of the vertex */,
        borderStyle: "solid",
        borderColor: `${msg.colour} transparent`,
      }}
    />
  );
};
export default Triangle;
