var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// GraphQL

var graphqlHTTP = require('express-graphql');
var schema = require('./schema');

// Database Setup

var mongoose  = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/waters',{
    useNewUrlParser:true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('connection',function(){ 
    console.log("Connect to Database");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000);

module.exports = app;