var express = require('express');
var router = express.Router();
var models = require('../models');
var generalResponse = require('../util/general_response');

var fs = require('fs');

var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

// /api/image
router.get('/', function(req, res, next) {

  models.Image.findAll()
  .then( function(images){
      console.log("images : ", images);
      res.json( {data : images} );
  }).catch( function(err){
      console.log("error : ", err);
      res.json(err);
  });

});

router.post('/', upload.single("image"), function(req,res,next){
  // create
  console.log("json : ", req.body);
  console.log("files : ", req.file);

  var oldPathWrited = req.file.path;
  var newPathToWrite;
  var newPath;
  var newShortPath;

  if( req.file.mimetype == "image/png" ){
    newPathToWrite = oldPathWrited + ".png";
    newPath = "uploads/" + req.file.filename + ".png";
    newShortPath = req.file.filename + ".png";
    fs.renameSync( oldPathWrited, newPathToWrite );
  }else if( req.file.mimetype == "image/jpeg" ){
    newPathToWrite = oldPathWrited + ".jpeg";
    newPath = "uploads/" + req.file.filename + ".jpeg";
    newShortPath = req.file.filename + ".jpeg";
    fs.renameSync( oldPathWrited, newPathToWrite );
  }else if( req.file.mimetype == "image/jpg" ){
    newPathToWrite = oldPathWrited + ".jpg";
    newPath = "uploads/" + req.file.filename + ".jpg";
    newShortPath = req.file.filename + ".jpg";
    fs.renameSync( oldPathWrited, newPathToWrite );
  }else{
    res.json( generalResponse( null, null, { message : 'image was null or doesnt have extension of .png, .jpg or .jpeg' } ) );
  }

  models.Image.build({
    title : req.body.title,
    shortPath : newShortPath,
    path : newPath,
  }).save().then(function(image){
    res.json( generalResponse( image ) );
  }).catch(function(err){
    console.log("error : ", err);
    res.json( generalResponse( null, null, err ) );
  });

});

router.post('/:id', function(req,res,next){
  // update
  models.Image
    .find( { where : { id : req.params.id } } )
    .then( function( image ){
      image.update({
        title : req.body.title,
      })
      .then(function(image){
        res.json( generalResponse( image ) );
      }).catch(function(err){
        console.log("error : ", err);
        res.json( generalResponse( null, null, err ) );
      });
    })
    .catch(function(err){
      console.log("error : ", err);
      res.json( generalResponse( null, null, { detail : "error on finding image" } ) );
    });
});

module.exports = router;
