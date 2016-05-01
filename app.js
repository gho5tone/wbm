/**
  * Setting variables for environment
  * Also doing some initialization
  */
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// I guess controllers would go here
// TODO: move Schemas to other pages, with directions from controllers

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/chatm");
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

// create scheme for chat
var ChatSchema = mongoose.Schema({
  // TODO: add a webm entry, or perhaps make a new Schema for it?
  created: Date,
  content: String,
  username: String
})

// TODO: Figure out if we need "CORS" and what it is

/**
  * These lines makes it so that everything in the public folder will be
  * served statically. This means that we can go to localhost:[port]/page.html
  * i.e. In this way index.html can access the css/js folders
  */
app.use(express.static(__dirname + '/public'));

/******************* ROUTES *******************/
// route to index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
});

// TODO: Figure out other routes we'll need (i.e. to database, msg history, etc)

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
  socket.on('webm', function(url) {
    io.emit('webm', url);
  });
  // TODO: Figure out if we want webm to be integrated in the chat or apart
  // TODO: Listener for new users
  // TODO: Listener for new message (connect to db)
});

// Set server port and run it
http.listen(3000, function() {
  console.log('server is running on http://localhost:3000');
});
