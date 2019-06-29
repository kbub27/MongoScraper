const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

// Mongo uri
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoScraper';

// Initialize express
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Mongo connection
mongoose.connect(MONGODB_URI);

require('./models')(app);
