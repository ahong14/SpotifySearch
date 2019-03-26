// require packages
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');

//express setup
const app = express();

// parse body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// use cors;
app.use(cors());

//serve react files
app.use(express.static(path.join(__dirname, 'frontend/build')));

//use routes
const router = express.Router();
const search = require('./routes/search');
const auth = require('./routes/auth');
const callback = require('./routes/callback');

//routes
app.use('/api/auth', auth);
app.use('/api/search', search);
app.use('/api/callback', callback);

//fix react app crashing on refresh
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

// listen to requests on port
// choose port based on environment
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT);