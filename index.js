var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override')
var parseurl = require('parseurl')
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

// express helpers, used for link_to
require('express-helpers')(app);

app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
// used for static files, like css
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// app.use("/", require('./controllers/main.js'));
app.use("/movies", require('./controllers/movies.js'));
app.use("/favorites", require('./controllers/favorites.js'));
// app.use("/favorites/:id/comments", require('./controllers/comments.js'));
// app.use("/tags", require('./controllers/tags.js'));

app.get('/', function  (req,res) {
  res.render('main/index.ejs');
})

app.listen(3000, function  () {
  console.log('Listening on port 3000!')
});