const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocMsg} = require("./utils/message.js");

const publicFolder = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicFolder));

io.on("connection", (socket)=>{
    console.log(" New User connected");

    socket.emit('newMessag',generateMessage("Admin","Welcome to Chat App"));

    socket.broadcast.emit('newMessag',generateMessage("Admin", "New user joined"));
    
    socket.on('createMessage',(message,callback)=>{
        console.log("Meassage from Client", message);
        io.emit('newMessag',generateMessage(message.from, message.text));
       callback();
    });

    socket.on('createLocMsg', (coords)=>{
        //io.emit('newMessage', generateMessage("Admin",`${coords.lat}, ${coords.long}`));
        io.emit('newLocMsg', generateLocMsg("FAke user", coords.lat, coords.long));
    })

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});

server.listen(port,()=>{
    console.log(" Server is up on ", port);
})