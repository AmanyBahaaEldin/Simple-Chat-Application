const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server , {
    cors: {
      origin: "http://localhost:3001"
    }
});

io.on('connection', (socket) => {
  console.log('a user connected' , socket.id);
  socket.on('message', (message) => {
      console.log(message);
      socket.broadcast.emit('new-message' , message)
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});