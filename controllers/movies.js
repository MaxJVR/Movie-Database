var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

//GET http://localhost:3000/movies
router.get("/", function(req, res) {
  var searchTerm = req.query.q;
  var url = "http://www.omdbapi.com/?s=" + searchTerm;
  request(url, function(error, response, data) {
    res.render("movies/index", {movies: JSON.parse(data)});
  });
});
// router.get('/', function(req,res) {
//   var movie = req.query.s
//   var url = 'http://www.omdbapi.com/?s=' + movie

//   request(url, function(error, response, data) {
//   var movieData = JSON.parse(data);
//   var results = movieData.Search

//     if (results) {
//       res.render('movies/index', {
//         movies: results
//       });
//     }
//   })
// })

//GET http://localhost:3000/movies/:id
router.get("/:id", function(req, res) {
  var movieId = req.params.id;
  var url = "http://www.omdbapi.com/?i=" + movieId + "&plot=full";
  request(url, function(error, response, data) {
    db.favorite.find({where:{imdbId:movieId}}).then(function(favorite){
      // res.send(movie);
      res.render("movies/show", {
        movie: JSON.parse(data),
        favorite:favorite
      })
    });
  });
});

// router.get('/show/:id', function(req,res){
//   var id = req.params.id
//   var url = "http://www.omdbapi.com/?i=" + id + "&tomatoes=true"

//   request(url, function(error, response, data){
//     var movieData = JSON.parse(data);
//     var results = movieData.Plot
//     var rating = parseInt(results.imdbRating)

//     if(results){
//       res.render('movies/show', {
//         movie: movieData,
//         plot: results,
//         rating: rating
//       });
//     }
//   })
// });






module.exports = router;