var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var utilizadoresRouter = require('./routes/userRoutes');
var concentRouter = require('./routes/meetingRoutes');
var discussionRouter = require('./routes/discussionRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/utilizadores',utilizadoresRouter);
app.use('/api/concentracoes',concentRouter);
app.use('/api/discussoes', discussionRouter);

module.exports = app;
