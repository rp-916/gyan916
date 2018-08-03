var socket = io();

socket.on('connect', ()=>{
    console.log("Connected to server");
});

socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

var msgTextBox = jQuery('[name=messageBox]') ;
var msgList = jQuery('#messageList');

socket.on('newMessag', (newMessage)=>{
    var formattedTime = moment(newMessage.createdAt).format("h:mm a");
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text:newMessage.text,
        from: newMessage.from,
        createdAt : formattedTime
    });

    msgList.append(html);
});

socket.on('newLocMsg', function(locMsg){
    var formattedTime = moment(locMsg.createdAt).format("h:mm a");
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from:locMsg.from,
        url:locMsg.url,
        createdAt: formattedTime
    });

    msgList.append(html);

/*     console.log("REcieved new loc event", locMsg);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Loc</a>');

    var formattedTime = moment(locMsg.createdAt).format("h:mm a");
    li.text(`${locMsg.from}: ${formattedTime} `);
    a.attr('href', locMsg.url);
    li.append(a);
    msgList.append(li); */
});


jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:"U1",
        text: msgTextBox.val()
    },function(msg){
        msgTextBox.val("");
    });
})

var locButton = jQuery('#send-location');
locButton.on('click', function(){
    if(!navigator.geolocation){
        return alert("GeoLocation API not supported");
    }

    locButton.attr('disabled', 'disabled').text("Sending Location ...");

    navigator.geolocation.getCurrentPosition(function(pos){
        console.log("currentPostion ",pos);
        var coords = pos.coords;
        locButton.removeAttr('disabled').text("Send Location")
        socket.emit('createLocMsg', {
            lat: coords.latitude,
            long: coords.longitude
        });
    }, function(err){
        locButton.removeAttr('disabled').text("Send Location");
        return alert("Unable to fetch");
    });

})