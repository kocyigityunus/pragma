var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');

/* GET home page. */
router.get('/', function(req, res, next) {

  models.App.findAll()
  .then( function(apps){
      console.log("apps : ", JSON.stringify( apps , null , 2 ) );
      res.json( generalResponse( apps ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.get('/:id', function(req, res, next) {

  models.App.find({
    where : { id : req.params.id },
    include : [
      { model : models.Version,
        as : 'versions',
        include : [ { model : models.VersionDetail, as : 'details' } ]
       }
    ]
  })
  .then( function(app){
      console.log("app : ", JSON.stringify( app , null , 2 ) );
      res.json( generalResponse( app ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.post('/', function(req,res,next){
  // create
  console.log(req.body);
  models.App.build({
    title : req.body.title,
    description : req.body.description,
  }).save().then(function(app){
    res.json( generalResponse( app ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });
});

router.delete('/:id', function(req, res, next) {
  // delete
  models.App.destroy({ where : { id : req.params.id } })
  .then( function(app){
      console.log("app : ", JSON.stringify( app , null , 2 ) );
      res.json( generalResponse( app ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});


module.exports = router;
