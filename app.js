// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);

/**
  * Everything in the public folder will be served statically
  * This means that we can go to localhost:[port]/page.html
  * In this way index can access the css
  */
app.use(express.static(__dirname + '/public'));

// set routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
});


// Set server port
http.listen(3000, function() {
  console.log('server is running');
});
