const storyModel = require('../models/stories');
const userModel = require('../models/user');
const likesModel = require('../models/likes');
const mongoose = require('mongoose');
const validStoryCategories = require('../constants/storyCategories');

// heading : {type : String,required : true},
//     storyCreatedBy : {
//       username : {type : String,required : true},
//       storyCreatedAt : {type : Date,default : Date.now()}
//     },
//     description : {type : String,required : true},
//     imageUrl : {type : String,required : true},
//     category : {type : String, enum : [...storyCategories],required : true},
//     countofLikes : {type : Number,required : true},
//     shareLinkUrl : {type : String,required : true},

const createNewStory = async (storyDetails,userId,username) => {
    try{
      let newStory = new storyModel({
         heading : storyDetails.heading,
         storyCreatedBy : {
            userId,
            username,
            storyCreatedAt : Date.now()
         },
         description : storyDetails.description,
         imageUrl : storyDetails.imageUrl,
         category : storyDetails.category,
         countofLikes : 0
      })

      await newStory.save();

      let response = {
        status : 200,
        success : true,
        message : 'New Story Created!'
      }

      return response;
    }catch(error){
      throw new Error('Failed to create a story!')
    }
}

const updateStory = async (storyId,keystoUpdate) => {
    try{
      //storyId is present or not
      if(!storyId){
        return {
            status : 400,
            message : 'StoryId is not present!'
        }
      }
      const isStoryPresent = await storyModel.findOneAndUpdate({_id : storyId},keystoUpdate,{new : true});
      console.log(isStoryPresent);
      if(!isStoryPresent){
        return {
            status : 400,
            message : 'Story not found!'
        }
      }

      return {
        status : 201,
        message : 'Story updated successfully!'
      }

    }catch(error){
      throw new Error('Error in updating a story!');
    }
}

const bookmarkStory = async (userId,storyId) => {
    try{
      //check if the storyid is present or not
      if(!storyId){
        return {
            status : 400,
            message : 'StoryId is not present!'
        }
      }
      
      //check if a story has already been bookmarked
      const isStoryPresent = await storyModel.findOne({_id : storyId},{_id : 1});
      if(!isStoryPresent){
        return {
            status : 400,
            message : 'Story not present!'
        }
      }

      const hasStoryBeenBookmarked = await userModel.findOne({"bookMarkedStories.storyId" : storyId},{_id : 1});
      if(hasStoryBeenBookmarked)return {
        status : 400,
        message : 'User has already bookmarked the story!'
      }

      await userModel.findOneAndUpdate({_id : userId},{
         $push : {bookMarkedStories : {storyId : new mongoose.Types.ObjectId(storyId)}}
      },{new : true});
     
      return {
        status : 201,
        message : "Story bookmared successfully!"
      }
    }catch(error){
      throw new Error('Error in bookmarking a new Story!')
    }
}

const likeStory = async (userId,storyId) => {
    try{
      //check if story is present
      //add the likes history 
      //increase the number of likes

      if(!storyId){
        return {
            status : 400,
            message : 'StoryId is not present!'
        }
      }
      //one like per user
      let hasUserAlreadyLikedStory = await likesModel.findOne({storyId : storyId},{storyId : 1});
      if(hasUserAlreadyLikedStory){
        return {
            status : 400,
            message : 'User has already liked the story!'
        }
      }
      
      
      let newLikes = new likesModel({
         storyId,
         storyLikedBy : userId
      });

      await newLikes.save();

      let isStoryPresent = await storyModel.findOneAndUpdate({_id : storyId},{
        $inc : {countofLikes : 1}
      });

      if(!isStoryPresent){
        return {
            status : 400,
            message : 'Story does not exist!'
        }
      }
      return {
        status : 200,
        message : 'Story liked by a user!'
      }

    }catch(error){
      throw new Error('Error in liking a story!')
    }
}

const getStoriesByCategory = async (category) => {
    try{
      if(!validStoryCategories.includes(category)){
        return {
            status : 400,
            data : [],
            message : 'Invalid story Category!'
        }
      }
      let stories = await storyModel.find({category : category},{storyCreatedBy : 0});
      return {
        status : 200,
        data : stories,
        message : 'Stories of all the cateogory type!'
      }
    }catch(error){
       throw new Error('Error in fetching all the stories by category!');
    }
}

const getStoriesByUserId = async (userId) => {
    try{
      let stories = await storyModel.find({"storyCreatedBy.userId" : userId},{storyCreatedBy : 0});
      console.log(stories);

      return {
        status : 200,
        data : stories,
        message : 'Stories created by the user!'
      }
    }catch(error){
      console.log(error.message);
      throw new Error('Error in fetching all the stories of a user!')
    }
}

const getBookmarkedStories = async (userId) => {
    try{
      let bookMarkedStories = await userModel.findOne({_id : userId},{bookMarkedStories : 1})
                                    .populate({path: 'bookMarkedStories',
                                    populate: { path: 'storyId'}}).exec();
     
      console.log(bookMarkedStories);
      return {
        status : 200,
        message : 'List of all the bookmarked stories!',
        data : bookMarkedStories
      }
    }catch(error){
        console.log(error.message);
      throw new Error('Error in fetching the bookmarked stories!')
    }
}

const getLikesOnStory = async () => {
    try{

    }catch(error){

    }
}

const checkStoryLikedByUser = async (userId,storyId) => {
    try{
       let isStoryLikedByUser = await likesModel.findOne({storyId : storyId,storyLikedBy : userId});
       if(isStoryLikedByUser){
        return {
           status : 200,
           likedByUser : true,
           message : 'Story has been liked by user!'
        }
       }
       else{
        return {
           status : 200,
           likedByUser : false,
           message : 'Story has not been liked by user!'
        }
       }
    }catch(error){
        console.log(error.message);
        throw new Error('Error in checking if the story is liked by user!')
    }
}

const getAllStories = async () => {
    try{
      const stories = await storyModel.find({},{storyCreatedBy : 0});
      return {
        status : 200,
        data : stories,
        message : 'All the stories!'
      }
    }catch(error){
        throw new Error('Error in fetching all the stories');
    }
}


module.exports = {
    createNewStory,
    updateStory,
    bookmarkStory,
    likeStory,
    checkStoryLikedByUser,
    getStoriesByCategory,
    getStoriesByUserId,
    getBookmarkedStories,
    getLikesOnStory,
    getAllStories
}

