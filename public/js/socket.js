//dont need to specify the port number because assumes host
var socket = io();
/**
  * This first method is the message sender
  * it works by using an emmitter which sends a 'chat message' "object"
  * it is sent from #m's value
  */
$('form').submit(function() {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

/**
  * This method is the listener for messages from other sockets
  */
socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});
