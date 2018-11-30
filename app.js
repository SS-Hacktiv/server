var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config()
const cors = require('cors')

var usersRouter = require('./routes/users');
const fbloginRouter = require('./routes/fblogin')
const googleloginRouter = require('./routes/googlelogin')

var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ss-hacktiv');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected database')
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/users', usersRouter);
app.use('/fblogin', fbloginRouter)
app.use('/googlelogin', googleloginRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
