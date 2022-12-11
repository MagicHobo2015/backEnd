// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//	Author: Joshua Land  E-Mail: Joshua.Land6@gmail.com						  +
//	This is just a basic express server										  +
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// need this for the server and routes
const express = require('express');
// this lets me use environment vars for private stuff
// or in this case stuff I want to change easily
const dotenv = require('dotenv').config();

const server = express();
const port = process.env.PORT;

server.get('/admin', (req, res) => {
	res.send('Hello World!');
});

server.listen(port, () => {
	console.log(`Listening on Port: ${port}`);
});