var express = require('express');
var router = express.Router();
var db = require('../models');


// GET http://localhost:3000/:id/tags/new
router.get('/:id/tags/new', function  (req,res) {
  res.render('tags/new', {favoriteId: req.params.id})
  // res.send("This is the tags page!")
});

// POST http://localhost:3000/tags
router.post('/:id/tags', function  (req,res) {
  var tagName = req.body.tagName;
  var favoriteId = req.params.id;

  db.favorite.findById(favoriteId).then(function(favorite) {
    db.tag.findOrCreate({where: {tag: tagName}}).spread(function(tag, created) {
      post.addTag(tag).then(function() {
        res.redirect('/favorites/' + favoriteId);
      })
    });
  });
  // res.send('you created a tag!')
});

module.exports = router;

