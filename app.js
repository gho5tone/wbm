/**
  * Setting variables for environment
  * Also doing some initialization
  */
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
  * This lines makes it so that everything in the public folder will be
  * served statically. This means that we can go to localhost:[port]/page.html
  * i.e. In this way index.html can access the css/js folders
  */
app.use(express.static(__dirname + '/public'));

// set routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
});

/**
  * This is the socket server
  * 'connection' is basically a listener (which listens to http server) for
  * incoming socket events
  */
io.on('connection', function(socket) {
  //you can make custom events such as this 'chat message'
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

// Set server port and run it
http.listen(3000, function() {
  console.log('server is running');
});
