var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var moviesController = require("./controllers/movies");
// express helpers, used for link_to
require('express-helpers')(app);
require('./controllers/movies.js')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// used for static files, like css
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.use("/movies", moviesController);


//Home Page
app.get('/', function(req,res){
  res.render('main/index.ejs');
});


app.listen(3000);