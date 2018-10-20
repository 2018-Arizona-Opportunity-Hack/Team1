var Binary = require('mongodb').Binary;
var fs = require('fs')

// File Binary Utils:

exports.convertFileToBinary = function( filePath )
{
    try 
    {
        var theFileData = fs.readFileSync( filePath );
        return Binary( theFileData );
    }
    catch ( error ) 
    {
        throw error;
    }
}

exports.convertBinaryToFile = function( fileData )
{
    fs.writeFile('temp_file.gif', fileData, function(err) { if(err) { throw err } } )
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