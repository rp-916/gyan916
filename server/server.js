const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicFolder = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicFolder));

io.on("connection", (socket)=>{
    console.log(" New User connected");

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });


    socket.on('createMessage',(msg)=>{
        console.log("Meassage from Client", msg);
    });

    socket.emit('newMessage', {
        from: "g@g.com",
        text:"Hi Rupesh",
        createdAt:"123"
    });






});



server.listen(port,()=>{
    console.log(" Server is up on ", port);
})