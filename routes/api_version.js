var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');

// /api/version
router.get('/', function(req, res, next) {

  if( req.query.appId ){

    models.Version.findAll({
      where : { appId : req.query.appId }
    }).then( function(versions){
        console.log("versions : ", JSON.stringify( versions , null , 2 ) );
        res.json( generalResponse( versions ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });

  }else{

    models.Version.findAll({})
    .then( function(versions){
        console.log( "versions : " , JSON.stringify( versions , null , 2 ) );
        res.json( generalResponse( versions ) );
    }).catch( function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
    });
  }

});

router.get('/:id', function(req, res, next) {

  models.Version.find( {
    where : { id : req.params.id },
    include : [
      { model : models.App , as : 'app' },
      { model : models.VersionDetail, as : 'details',
        include : [
          { model : models.User, as : 'createdByUser'  },
          { model : models.Image, as : 'featuredImage'  },
        ]
      }
    ]
  }).then( function(version){
      //console.log("vesion : ", JSON.stringify( version , null , 2 ) );
      res.json( generalResponse( version ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

router.post('/', function(req,res,next){
  // create
  console.log(req.body);
  models.Version.build({
    title : req.body.title,
    description : req.body.description,
    appId : req.body.appId,
  }).save().then(function(app){
    res.json( generalResponse( app ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });
});

router.post('/:id', function(req,res,next){
  // update
  models.Version
    .find( { where : { id : req.params.id } } )
    .then( function( version ){
      version.update({
        title : req.body.title,
        description : req.body.description,
        appId : req.body.appId,
      })
      .then(function(version){
        res.json( generalResponse( version ) );
      }).catch(function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
      });
    })
    .catch(function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, { detail : "error on finding version" } ) );
    });
});

router.delete('/:id', function(req, res, next) {
  // delete
  models.Version.destroy({ where : { id : req.params.id } })
  .then( function(version){
      console.log("version : ", JSON.stringify( version , null , 2 ) );
      res.json( generalResponse( version ) );
  }).catch( function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, err ) );
  });

});

module.exports = router;
