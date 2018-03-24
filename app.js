// require
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var fileupload = require('express-fileupload');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var login = require('./controllers/login');
var home = require('./controllers/home');
var admin = require('./controllers/admin');
var items = require('./controllers/items');
var customer = require('./controllers/customer');
var employee = require('./controllers/employee');
var sales = require('./controllers/sales');


var port = process.env.PORT || 880;

//app.locals.myvar = "Surprise!!";
// configure
app.set('view engine', 'ejs');

// middleware

app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(__dirname + "/controllers/images"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));
app.use(expressValidator({
customValidators: {
    isImage: function(value, filename) {

        var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            default:
                return false;
        }
    }
}}));



app.use(fileupload());
// routes
app.get('/', function(req, res){
	//res.redirect('/login');
	res.send("server started...")
});

app.use(login);
app.use(home);
app.use(admin);
app.use(items);
app.use(customer);
app.use(employee);
app.use(sales);

// server
app.listen(port, function(){
	console.log('Server started at ' + port + ' port....');
});