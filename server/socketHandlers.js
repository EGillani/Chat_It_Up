const userModules = require("./userModules");

const messageObject = (message, user) => {
  return {
    text: message,
    colour: user.colour,
    from: user.chatName,
    timeStamp: userModules.getCurrentTime(),
  };
};

const handleJoin = (socket, clientData) => {
  const userExists = userModules.addUser(clientData);
  //create new admin and assign a colour
  if (!userModules.getAdminDetails()) {
    userModules.createAdmin();
  }
  const adminDetails = userModules.getAdminDetails();
  if (!userExists) {
    socket.emit("nameexists", {
      text: "name already taken, try a different name",
    });
  } else {
    socket.name = clientData.chatName;
    socket.join(clientData.roomName);
    userModules.addUser(clientData);
    socket.emit(
      "welcome",
      messageObject(`Welcome ${socket.name}`, adminDetails)
    );
    socket
      .to(clientData.roomName)
      .emit(
        "someonejoined",
        messageObject(`${socket.name} has joined this room`, adminDetails)
      );
  }
};

const handleDisconnect = (socket) => {
  const user = userModules.removeUser(socket.name);
  const adminDetails = userModules.getAdminDetails();
  if (user) {
    socket
      .to(user.roomName)
      .emit(
        "someoneleft",
        messageObject(`${socket.name} has left this room`, adminDetails)
      );
  }
};

const handleTyping = (socket, clientData) => {
  const user = userModules.getUser(clientData.from);
  socket
    .to(user.roomName)
    .emit("someoneistyping", { text: `...${user.chatName} is typing` });
};

const handleMessage = (io, clientData) => {
  const user = userModules.getUser(clientData.from);
  io.to(user.roomName).emit("newmessage", messageObject(clientData.text, user));
};
const handleRooms = (io) => {
  let rooms= userModules.getRooms();
  if(!rooms.includes("main"))
    rooms=["main",...rooms];
  
  io.emit("rooms", { rooms: rooms });
};

const handleGetRoomsAndUsers = (io) => {
  let users = userModules.getAllUsers().map((item) => {
    return {
      roomName: item["roomName"],
      chatName: item["chatName"],
      colour: item["colour"],
    };
  });
  io.emit("roomsandusers", { users: users });
};

module.exports = {
  handleJoin,
  handleRooms,
  handleDisconnect,
  handleTyping,
  handleMessage,
  handleGetRoomsAndUsers,
};
