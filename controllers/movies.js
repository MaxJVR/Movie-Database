var express = require('express');
var router = express.Router();
var request = require('request')

//Movies Search
router.get('/', function(req,res) {
  var movie = req.query.s
  var url = 'http://www.omdbapi.com/?s=' + movie

  request(url, function(error, response, data) {
  var movieData = JSON.parse(data);
  var results = movieData.Search

    if (results) {
      res.render('movies/index', {
        movies: results
      });
    }
  })
})

router.get('/show/:id', function(req,res){

  var id = req.params.id
  var url = "http://www.omdbapi.com/?i=" + id + "&tomatoes=true"

  request(url, function(error, response, data){
    var movieData = JSON.parse(data);
    var results = movieData.Plot
    var rating = parseInt(results.imdbRating)

    if(results){
      res.render('movies/show', {
        movie: movieData,
        plot: results,
        rating: rating
      });
    }
  })
});





module.exports = router;