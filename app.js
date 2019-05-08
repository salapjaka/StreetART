// app.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var hbs    = require('hbs');
var fs    = require('file-system');
require('dotenv').config()

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var path = require('path');

// hbs.registerPartial("artList", (__dirname + '/views/art'));

hbs.registerPartial("artList", fs.readFileSync(__dirname + '/views/art.hbs', 'utf8'));

hbs.registerHelper('json', function(context){
    return JSON.stringify(context)
})

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database



require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs'); // set up hbs for templating

app.use(express.static(path.join(__dirname, 'public')));


// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/index.js')(app, passport)

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
