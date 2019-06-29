const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bars = require('express-handlebars');

// Mongo uri
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoScraper';

// Initialize express
const app = express();

// Handlebars setup 
app.engine('handlebars', bars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Mongo connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

