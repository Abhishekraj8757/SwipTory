const mongoose = require('mongoose');
const storyCategories = require('../constants/storyCategories');

const storySchema = new mongoose.Schema({
    heading : {type : String,required : true},
    storyCreatedBy : {
      userId : {type : String,required : true},
      username : {type : String,required : true},
      storyCreatedAt : {type : Date,default : Date.now()}
    },
    description : {type : String,required : true},
    imageUrl : {type : String,required : true},
    category : {type : String, enum : [...storyCategories],required : true},
    countofLikes : {type : Number,required : true},
    shareLinkUrl : {type : String},
});

const storyModel = mongoose.model('Story',storySchema);
module.exports = storyModel;