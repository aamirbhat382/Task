const express = require("express");
const app = express();
const path = require("path");
const Emitter = require("events");
const port = 3380;

// Event emitter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

//   Data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server
const server = app.listen(3380, () => {
  console.log(`Server Started at Port ${port}`);
});

// Socket
const io = require('socket.io')(server, {
  cors: {
    origin: "*"}
  })



io.on('connection', (socket) => {
    // console.log('connected')
  socket.on('join', (roomName) => {
    // console.log(roomName)
      socket.join(roomName)
      socket.on(roomName, (msg) => {
        // console.log(msg)
        socket.broadcast.emit(roomName, msg)
    })
  })
})

