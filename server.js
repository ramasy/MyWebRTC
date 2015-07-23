var express = require('express'),http = require('http');
var app = express();
var url = require("url");
var querystring = require('querystring');
// configuration port sy ip standard @openshift
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
//api key mba hahazoana sessionid hoan'ny prof
var OpenTok = require('opentok');
var opentok = new OpenTok('45291332', '9af4c41ba485089efdd6721e744818b89797a4a8');
var sessionId;
var token;

app.get('/', function(req, res) {
	res.render('index.ejs');
	console.log('baka@http: misy olo connecté!! @ '+url.parse(req.url).pathname);

})
.get('/video', function(req, res) {
	var params = querystring.parse(url.parse(req.url).query);
	
	res.render('room.ejs',{name:params['nom'],id:params['id'],clef:params['token']});
	console.log('baka@http: misy olo connecté!! @ '+url.parse(req.url).pathname);
})
.get('/prof', function(req, res) {
	res.render('espace-prof.ejs');
	console.log('baka@http: misy olo connecté!! @ '+url.parse(req.url).pathname);
});
var http_server=http.createServer(app);

var io = require('socket.io').listen(http_server);
// refa misy client connecté @le socket server
io.sockets.on('connection', function (socket) {
socket.emit('message','vous êtes connecté');
socket.on('profConnect', function (message) {
		opentok.createSession(function(err, session) {
		 if (err) return console.log(err);
		 sessionId=session.sessionId;
		 token = session.generateToken();
		 var data = {
	 		nom:message,
		    id:sessionId,
		    clef:token
			};
		socket.emit('data',data);
		});
	//console.log("Nandefa message le client"+message);
	//socket.emit('message',message);
		
	});
});

http_server.listen(port,ip);
