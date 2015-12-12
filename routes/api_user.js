var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');

/* GET home page. */
router.get('/', function(req, res, next) {

  models.User.findAll()
  .then( function(users){
      console.log("users : ", users);
      res.json( {data : users} );
  }).catch( function(err){
      console.log("error : ", err);
      res.json(err);
  });

});

module.exports = router;
