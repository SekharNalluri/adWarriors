var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var advertisersRouter = require('./routes/advertisers');
var promotersRouter = require('./routes/promoters');
var authRouter = require('./routes/auth')(passport);
var jobsRouter = require('./routes/jobs');
var messagesRouter = require('./routes/messages');


//auth
var initPassport = require('./passport-init');
initPassport(passport);

//Database
mongoose.connect('mongodb://127.0.0.1:27017/adWarriors');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


app.use('/advertisers', advertisersRouter);
app.use('/promoters', promotersRouter);
app.use('/auth', authRouter);
app.use('/jobs', jobsRouter);
app.use('/messages', messagesRouter);

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

	console.log("error handler",err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
