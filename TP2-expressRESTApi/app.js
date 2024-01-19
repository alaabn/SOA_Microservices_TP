const cookieParser = require('cookie-parser');
const express = require('express');
const createHttpError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`
    message: ${err.message}
  `);
});

module.exports = app;
