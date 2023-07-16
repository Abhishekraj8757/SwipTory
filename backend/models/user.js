const mongoose = require('mongoose');
const Stories = require('../models/stories');
const storyCategories = require('../constants/storyCategories');

const UserSchema = new mongoose.Schema({
    username : {type : String,required : true},
    password : {type : String,required : true},
    bookMarkedStories : [{
        storyId : {type : mongoose.Schema.Types.ObjectId,ref : Stories}
    }]
});

const UserModel = mongoose.model('Users',UserSchema);
module.exports = UserModel;