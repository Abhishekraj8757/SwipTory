const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    storyId : {type : mongoose.Schema.Types.ObjectId,required : true},
    storyLikedBy : {type : mongoose.Schema.Types.ObjectId,required: true}
});

const likesModel = mongoose.model('Likes',likesSchema);
module.exports = likesModel;