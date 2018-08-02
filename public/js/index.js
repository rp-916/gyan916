var socket = io();

socket.on('connect', ()=>{
    console.log("Connected to server");

    socket.emit('createMessage', {
        from:"client1",
        text: "Client 1 meassage"
    });
});

socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', (newMessage)=>{
    console.log('New Message', newMessage );
})