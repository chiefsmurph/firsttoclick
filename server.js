var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 5000; // Use the port that Heroku
server.listen(port);

console.log('listening on ' + port);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
  console.log('connected socket');
});

function startGame() {
  io.sockets.emit('start');
  console.log('start')

  setTimeout(function() {
    io.sockets.emit('flash');
    console.log('flash')

    setTimeout(startGame, 10000);

  }, (10 + Math.random() * 10) * 1000 );

}

setTimeout(startGame, 2000);
