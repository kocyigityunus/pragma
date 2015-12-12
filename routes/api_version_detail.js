var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');

// /api/version-detail
router.get('/', function(req, res, next) {
  // get all
  models.VersionDetail.findAll()
  .then( function(versiondetails){
      console.log("versiondetails : ", JSON.stringify( versiondetails , null , 2 ) );
      res.json( generalResponse( versiondetails ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.get('/:id', function(req, res, next) {
  // get specific
  models.VersionDetail.find( { where : { id : req.params.id } } )
  .then( function(versiondetail){
      console.log("versiondetail : ", JSON.stringify( versiondetail , null , 2 ) );
      res.json( generalResponse( versiondetail ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.post('/', function(req,res,next){
  // create
  console.log(req.body);
  models.VersionDetail.build({
    title : req.body.title,
    description : req.body.description,
    versionId : req.body.versionId,
    featuredImageId : req.body.featuredImageId
  }).save().then(function(versiondetail){
    res.json( generalResponse( versiondetail ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });
});

router.post('/:id', function(req,res,next){
  // update
  models.VersionDetail
    .find( { where : { id : req.params.id } } )
    .then( function( versiondetail ){
      versiondetail.update({
        title : req.body.title,
        description : req.body.description,
        versionId : req.body.versionId,
        featuredImageId : req.body.featuredImageId
      })
      .then(function(versiondetail){
        res.json( generalResponse( versiondetail ) );
      }).catch(function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
      });
    })
    .catch(function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, { detail : "error on finding versiondetail" } ) );
    });
});

module.exports = router;
