var fs = require('fs')

// File Binary Utils:

exports.convertFileToBinary = function( filePath )
{

}

exports.convertBinaryToFile = function( fileData )
{

}

exports.exportToFile = async function( fileName, file, res )
{
    directory = __dirname + "/../gifs/" + fileName;

    // Write the file to a local file 
    fstream = fs.createWriteStream( directory );
    await file.pipe( fstream );

    fstream.on('close', function() {
        res.status(200).json({status: 200, message: "Successfully uploaded the gif", gifId: fileName });
    });
}