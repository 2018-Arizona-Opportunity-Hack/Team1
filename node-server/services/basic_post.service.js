// Retrieve the basic post model
var BasicPost = require('../models/basic_post.model')

// =========================== CRUD FUNCTIONALITY ========================

exports.ReadBasicPost = async function( query, page, limit )
{
    var options = { page, limit };

    try {
        var retrievedBasicPosts = await BasicPost.paginate( query, options );
        return retreivedBasicPosts;
    } catch( error ) {
        throw Error('Error in reading basic post from db');
    }
}

exports.CreateBasicPost = async function( basicPost ) 
{
    var newBasicPost = new BasicPost({
        postDescription : basicPost.postDescription,
        gifData : basicPost.gifData,
        upvotes : basicPost.upvotes
    });

    try {
        var savedPost = await newBasicPost.save();
        return savedPost;
    } catch( error ) {
        throw Error('Error in saving basic post into db');
    }
}