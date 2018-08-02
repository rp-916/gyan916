const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require("./utils/message.js");

const publicFolder = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicFolder));

io.on("connection", (socket)=>{
    console.log(" New User connected");

    socket.emit('newMessage',generateMessage("Admin","Welcome to Chat App"));

    socket.broadcast.emit('newMessage',generateMessage("Admin", "New user joined"));
    
    socket.on('createMessage',(message)=>{
        console.log("Meassage from Client", message);
        io.emit('newMessage',generateMessage(message.from, message.text));
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});

server.listen(port,()=>{
    console.log(" Server is up on ", port);
})