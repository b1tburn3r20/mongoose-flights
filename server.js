const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { Validator } = require('jsonschema');
const flightSchema = require('./models/flightSchema'); // Add this line
const flightRoutes = require('./routes/flightRoutes')
const methodOverride = require('method-override');
;

require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('connected', function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

const validator = new Validator();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Placeholder data for flights (you can replace this with a database)
app.locals.flights = [];

// Make the flight schema and validator accessible in the controllers
app.locals.flightSchema = flightSchema;
app.locals.validator = validator;

app.use('/flights', flightRoutes);


// Redirect root URL to /flights
app.get('/', (req, res) => {
  res.redirect('/flights');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
