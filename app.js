var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var utilizadoresRouter = require('./routes/userRoutes');
var concentRouter = require('./routes/meetingRoutes');
var discussionRouter = require('./routes/discussionRoutes');
var carrosRouter = require('./routes/carrosRoutes');
var pontosRouter = require('./routes/pontosRoutes');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/utilizadores',utilizadoresRouter);
app.use('/api/concentracoes',concentRouter);
app.use('/api/discussoes', discussionRouter);
app.use('/api/pontos', pontosRouter);
app.use('/api/carros',carrosRouter);

module.exports = app;
