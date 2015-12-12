var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.User.findAll()
  .then( function(users){
      console.log("users : ",  JSON.stringify( users , null , 2 ) );
  }).catch( function(err){
      console.log("error : ", err);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
