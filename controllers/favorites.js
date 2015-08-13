var express = require('express');
var router = express.Router();
var db = require('../models');
// GET http://localhost:3000/favorites
router.get('/',function(req,res){
  db.favorite.findAll({
    include:[db.comment, db.tag]
  }).then(function(favorites){
    res.render('favorites/index',{
      favorites:favorites});
  });
});

// POST http://localhost:3000/favorites
router.post('/',function(req,res){
  // res.send(req.body)
  db.favorite.create({
    imdbId:req.body.imdbId,
    title:req.body.title,
    year:req.body.year,
    poster:req.body.poster
  }).then(function(movie){
    res.redirect('/movies/'+movie.imdbId);
  });
});

// DELETE http://localhost:3000/favorites/:id
router.delete('/:id',function(req,res){
  db.favorite.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/favorites');
  })
});


// GET http://localhost:3000/favorites/:id/comments
router.get('/:id/comments',function(req,res){
  // res.send(req.params);
  db.favorite.find({
    where:{id:req.params.id},
    include:[db.comment]
  }).then(function(favorite){
    res.render('comments/index',{
      favorite:favorite
    });
  });
});

// POST comments
router.post('/:id/comments',function(req,res){
  db.favorite.findById(req.params.id).then(function(favorite){
    favorite.createComment({body:req.body.body}).then(function(comment){
      res.redirect('/favorites/' + favorite.id + '/comments');
    });
  });
  // res.send({params:req.params,body:req.body});
});

// GET tags at http://localhost:3000/:id/tags
router.get('/:id/tags/new', function  (req,res) {
  res.render('tags/new', {favoriteId: req.params.id});
  // res.send("This is the tags page!")
});

// POST tags at http://localhost:3000/favorites/:id/tags
router.post('/:id/tags', function  (req,res) {
  var tagName = req.body.tagName;
  var favoriteId = req.params.id;

  db.favorite.findById(favoriteId).then(function(favorite) {
    db.tag.findOrCreate({where: {tag: tagName}}).spread(function(tag, created) {
      favorite.addTag(tag).then(function(tag) {
        res.redirect('/favorites');
      })
    });
  });
  // res.send('you created a tag!')
});

router.get('/tags',function(req,res){
  db.tag.findAll({
  }).then(function(tags){
    res.render('tags/index',{tags:tags
    });
  });
  // res.send("These are my tags!");
});

module.exports = router;