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

function sendFlash() {
  io.sockets.emit('flash');
  console.log('flash')
  setTimeout(sendFlash, (10 + Math.random() * 10) * 1000 );
}

setTimeout(sendFlash, 2000);
