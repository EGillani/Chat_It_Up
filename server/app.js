require("dotenv").config();
const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const port = process.env.PORT || 5000;
// const app = express();
let app = express();
// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable("trust proxy");
// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.

//Google Chrome and Edge hate this so im commenting it out - it worked before 
/*app.use((req, res, next) => {
  req.secure
    ? // request was via https, so do no special handling
      next()
    : // request was via http, so redirect to https
      res.redirect("https://" + req.headers.host + req.url);
});*/
app.use(express.static("server/public"));
let server = http.createServer(app);
let io = socketIO(server);
const socketHandlers = require("./socketHandlers");

app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));

io.on("connection", (socket) => {
  console.log("new connection established");
  //scenario - dynamic radio buttons
  socketHandlers.handleRooms(io);
  // scenario 1 - client sends server 'join' message using room to join
  socket.on("join", (clientData) => {
    socketHandlers.handleJoin(socket, clientData);
    socketHandlers.handleGetRoomsAndUsers(io);
  });
  // scenario 2 - client disconnects from server
  socket.on("disconnect", () => {
    socketHandlers.handleDisconnect(socket);
    socketHandlers.handleGetRoomsAndUsers(io);
  });
  // scenario 3 - client starts typing
  socket.on("typing", (clientData) => {
    socketHandlers.handleTyping(socket, clientData);
  });
  // scenario 4 - client handles new message
  socket.on("message", (clientData) => {
    socketHandlers.handleMessage(io, clientData);
  });
});

// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});
// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
server.listen(port, () => console.log(`starting on port ${port}`));
