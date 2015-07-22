var express = require('express'),http = require('http');
var app = express();
var url = require("url");
// configuration port sy ip standard @openshift
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.get('/', function(req, res) {
res.render('1.ejs');
console.log('baka@http: misy olo connecté!! @ '+url.parse(req.url).pathname);
})
.get('/video', function(req, res) {
res.render('2.ejs');
console.log('baka@http: misy olo connecté!! @ '+url.parse(req.url).pathname);
});
var http_server=http.createServer(app);

var io = require('socket.io').listen(http_server);
// refa misy client connecté @le socket server
io.sockets.on('connection', function (socket) {
socket.emit('message','vous êtes connecté');
socket.on('message', function (message) {
	console.log("Nandefa message le client"+message);
	});
});

http_server.listen(port,ip);
