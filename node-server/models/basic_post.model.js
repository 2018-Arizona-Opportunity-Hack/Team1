var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var BasicPostSchema = new mongoose.Schema({
    postDescription: String,
    gifData: String,
    upvotes: Number
});

BasicPostSchema.plugin(mongoosePaginate);
var BasicPost = mongoose.model('BasicPost', BasicPostSchema);

// Export this model for reuse
module.exports = BasicPost;