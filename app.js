var createError = require('http-errors');
var express = require('express');
const http = require('http').Server(app);

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var menuRouter = require('./routes/menu'); 
const loginController = require('./controllers/login_controller');

const cors = require('cors');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});
var serverPort = 3001;

// Initialize socket_list as an empty object (or array, depending on your needs)
var socket_list = {}; 

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/menu', menuRouter);

// Pass app, io, and socket_list to loginController
loginController.controller(app, io, socket_list);

const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
server.listen(serverPort, () => {
  console.log("Server Start : " + serverPort);
});

module.exports = app;
