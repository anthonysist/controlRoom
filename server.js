var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var cors = require('cors');

var analytics = require('./server/analytics.js');

server.listen(3000);

// Request headers you wish to allow


analytics.ga();

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/server", express.static(path.join(__dirname, 'server')));


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/master', function (req, res) {

	res.sendfile(__dirname + '/public/views/masterView.html');
});

app.get('/map', function (req, res) {

	res.sendfile(__dirname + '/public/views/mapView.html');
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});