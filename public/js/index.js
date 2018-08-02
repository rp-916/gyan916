var socket = io();

socket.on('connect', ()=>{
    console.log("Connected to server");
});

socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', (newMessage)=>{
    console.log('New Message', newMessage );

    var li = jQuery('<li></li>');
    li.text(`${newMessage.from} : ${newMessage.text}`);

    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:"U1",
        text: jQuery("[name= message]").val()
    });
})