var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const errorLogger = require('./utilities/errorlogger');
var moment = require('moment-timezone');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// to write the request logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' } // a - append
);

// request logger
logger.token('date', (req, res, tz) => {
  return moment().tz(tz).format()
})
logger.format('myformat', '[:date[Asia/Kolkata]] ":method :url" :status :res[content-length] - :response-time ms');
app.use(logger('myformat', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorLogger);

app.listen(1050);
console.log('Server listening at port: 1050')

module.exports = app;
