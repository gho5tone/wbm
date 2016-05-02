//dont need to specify the port number because assumes host
var socket = io();


$('#usersbox').submit(function(e) {
  // prevent the form from submitting
  e.preventDefault();
  socket.emit('new user', $('#set-user-name').val(), function(check) {
    if(check) {
      $('#user-name').hide();
      $('#container').show();
    } else {
      $('#errors').html('User already exists');
    }
  });

  $('#set-user-name').val('');
});
/**
  * This first method is the message sender
  * it works by using an emmitter which sends a 'chat message' "object"
  * it is sent from #m's value
  */
$('#chatbox').submit(function(e) {
  // prevent the form from submitting
  e.preventDefault();
  // Here's a basic webm interaction
  if ($('#m').val() == "you were the chosen one") {
    // TODO: Figure out how to detect webm playing or not
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    $('#webm iframe').detach();
    $('<iframe width="560" height="315" frameborder="0"></iframe>')
      // TODO: Make the addition be dynamic
      // TODO: Fill our database with generic tokens that link to webms
      .attr("src", "https://www.youtube.com/embed/" + "HUBWxiu5cOo?autoplay=1")
      .appendTo("#webm");
    $('#webm iframe').show();
    // TODO: we should figure out if we want to fade out or not
    $('#webm iframe').delay(5000).fadeOut('slow');
  }
  else {
    chatMessage();
  }
  return false;
});

/**
 * Issue the message to the client
 */
function chatMessage() {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
}

/**
  * This method is the listener for messages from other sockets
  */
socket.on('chat message', function(data) {
  $('#messages').append('<li><b>' + data.user + ':</b> ' + data.msg + '</li>');
});

socket.on('usernames', function(users) {
  var str = '';
  for(i = 0; i<users.length; i++) {
    str += '<li>' + users[i] + '</li>';
  }
  $('#users').html(str);
});
