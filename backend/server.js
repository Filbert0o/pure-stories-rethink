require('dotenv').config({path: '../.env'})

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
var http = require('http').Server(app);

import busboy from 'connect-busboy';
import busboyBodyParser from 'busboy-body-parser';

//rethink
import db from './models/db';

// Import routes here
import stories from './controllers/stories';
import authors from './controllers/authors';

// Create our app instances
const app = express();

app.use(express.static(path.join(__dirname, '../dist/client')));


// Set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3000;

let dbModel = new db();
dbModel.setupDb();
// let connection = null;
// r.connect({host: 'localhost', port: 28015}, (err, conn) => {
//   if (err) throw err;
//   connection = conn;
// })

// Now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(busboy());
app.use(busboyBodyParser());

// Passport middleware
// app.use(passport.initialize());

// Hello World at '/'
app.get('/hi', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

// Use Multiple Routes
app.use('/api/stories', stories);
app.use('/api/authors', authors);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
// http.listen(3000, function () {
//   console.log('listening on port 3000');
// });
