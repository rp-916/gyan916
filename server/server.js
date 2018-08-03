const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocMsg} = require("./utils/message.js");
const {isRealString} = require('./utils/validation');
const {Users} = require("./utils/users");

const publicFolder = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicFolder));

io.on("connection", (socket)=>{

     
    socket.on('join',(params, callback)=>{
        if( !isRealString(params.name) || !isRealString(params.room)){
            return callback("Can not be empty");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        //console.log(`B4 Adding ${params.name} into ${params.room}`, users.getUserList(params.room));
        users.addUser(socket.id, params.name, params.room);
        // console.log("After adding:",params.name, users.getUserList(params.room))
        //console.log(" New User connected", params.name);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessag',generateMessage("Admin","Welcome to Chat App"));
        socket.broadcast.to(params.room).emit('newMessag',generateMessage("Admin", `${params.name} joined`));
   
        callback();
    });


    socket.on('createMessage',(message,callback)=>{
       // console.log("Meassage from Client", message);
       var user = users.getUser(socket.id);
       if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessag',generateMessage(user.name, message.text));
       }
       
       callback();
    });

    socket.on('createLocMsg', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocMsg', generateLocMsg(user.name, coords.lat, coords.long));
        }
        
    });

    socket.on('disconnect', ()=>{
        //console.log("B4 remove:", users.getUserList(users.getUser(socket.id).room));
        var user = users.removeUser(socket.id);
        //console.log("After remove:", users.getUserList(user.room));

        //console.log("Disconnect is called", user.name);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessag', generateMessage("Admin", `${user.name} has left.`));
        }
    });
});

server.listen(port,()=>{
    console.log(" Server is up on ", port);
})