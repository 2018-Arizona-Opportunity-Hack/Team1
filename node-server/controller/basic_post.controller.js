// INTERFACE FOR CREATING HTTP REQUESTS AND RESPONSES AND HANDLING HTTP REQUESTS FROM
// THE WEB APPLICATION

var BasicPostService = require('../services/basic_post.service');
var FileUtils = require('../utilities/file_utils');

var Busboy = require('busboy');

// ================================ CRUD ==================================

exports.ReadBasicPosts = async function(req, res, next) {
    console.log("READ BASIC POST");

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var retrievedBasicPosts = await BasicPostService.ReadBasicPost({}, page, limit)
        return res.status(200).json({status: 200, data: retrievedBasicPosts, message: "Successfully Retrieved Posts"});
    } catch ( error ) {
        return res.status(400).json({status: 400, message: error.message});
    }
}

exports.CreateBasicPosts = async function(req, res, next) {
    console.log("CREATE BASIC POST");

    // The name of the gif that is stored in the cache
    var theGifId = req.body.gifId;

    console.log(theGifId);

    try {
        // get the file and convert that to binary
        var theGifBinary = FileUtils.convertFileToBinary( __dirname + "/../gifs/" + theGifId );
    } catch ( error ) {
        return res.status(400).json({status: 400, message: error.message});
    }

    if( !theGifBinary ) {
        return res.status(400).json({status: 400, message: "Failed to convert gif into binary"});
    }

    var newBasicPost = {
        postDescription: req.body.postDescription,
        gifData: theGifBinary,
        upvotes: 0
    }

    console.log(newBasicPost);

    try {
        var createdBasicPost = await BasicPostService.CreateBasicPost( newBasicPost );
        return res.status(200).json({status: 200, data: createdBasicPost, message: "Successfully Retrieved Posts"});
    } catch ( error ) {
        return res.status(400).json({status: 400, message: error.message});
    }
}

exports.UploadGif = async function(req, res, next) {
    console.log("UPLOADING GIF");

    var busboy = new Busboy( { headers: req.headers });

    if( busboy )
    {
        busboy.on('file', async function( fieldName, file, fileName, encoding, mimetype) {
            console.log("Uploading: " + fileName);
            theResponse = await FileUtils.exportToFile( fileName, file, res );
            return theResponse;
        });

        busboy.on('finish', async function() {
            
        })

        return req.pipe(busboy);
    } 
    else 
    {
        return res.status(400).json({status: 400, message: "Busboy initialization failed"});
    }
}