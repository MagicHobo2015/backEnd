// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	Author: Joshua Land  E-Mail: Joshua.Land6@gmail.com						  +
//	This should be the start of my classy backend							  +
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// need this for the server and routes
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const authRouter = require('./routes/auth');

// this lets me use environment vars for private stuff
// or in this case stuff I want to change easily
const dotenv = require('dotenv').config();
// small section to get my env vars.
const port = process.env.PORT;
const secret = process.env.COOKIE_SECRET;

const server = express();
const router = express.Router();

server.use(express.json());
server.use( express.urlencoded( { extended: true } ) );
server.use( express.static( __dirname ) );
server.use( cookieParser() );

var session;

// ********Session Options*****************************************************
//	ms * 60 = min * 60 = hour * 24 = ONEDAY
const oneDay = 1000 * 60 * 60 * 24;

// dont forget to learn about all this..
server.use(sessions({
	secret: "my secret string should not be here",
	saveUninitialized: true,
	cookie: { maxAge: oneDay },
	resave: false
}));

server.get('/views/admin.css', ( req, res ) => {
	res.writeHead(200, { "Content-Type": "text/css" });
	res.write('/views/admin.css');
});

// this is where the routes will live
server.get('/', ( req, res ) => {
	session = req.session;
	if(session.userid){
		res.send("Welcome User <a href=\'/logout'>Click to log out</a>");
	} else {
		res.sendFile('views/index.html', { root:__dirname });
	}
})

// ********************************* TEMP *************************************'
var myusername = process.env.ADMIN_USERNAME;
var mypassword = process.env.ADMIN_PASSWORD;
console.log(myusername);


server.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

server.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


// here we bind it to the port for listening
server.listen(port, () => {
	console.log(`Listening on Port: ${port}`);
});