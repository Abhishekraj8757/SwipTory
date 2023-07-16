const storyService = require('../services/storiesService');


const createNewStory = async (req,res,next) => {
   try{
     let response = await storyService.createNewStory(req.body,req.user.userId,req.user.username);

     return res.status(response.status).json({
        status : response.status,
        success : true,
        message : response.message
     })
   }catch(error){
      return res.status(400).json({
        status : 400,
        success : false,
        message : error.message
     })
   }
}

const updateStory = async (req,res,next) => {
   try{
      console.log(req.params.storyId);
      console.log(req.body);


      let response = await storyService.updateStory(req.params?.storyId,req.body);
      
      return res.status(response.status).json({
        status : response.status,
        success : true,
        message : response.message
     })

    }catch(error){
      return res.status(400).json({
            status : 400,
            success : false,
            message : error.message
         })
    }
}

const bookmarkStory = async (req,res,next) => {
    try{
      let response = await storyService.bookmarkStory(req.user.userId,req.params?.storyId);

      return res.status(response.status).json({
        status : response.status,
        success : true,
        message : response.message
     })
    }catch(error){
        console.log(error.message);
      return res.status(400).json({
            status : 400,
            success : false,
            message : error.message
         })
    }
}

const likeStory = async (req,res,next) => {
    try{

     const response = await storyService.likeStory(req.user.userId,req.params?.storyId);
     
     return res.status(response.status).json({
        status : response.status,
        success : true,
        message : response.message
     })

    }catch(error){
        return res.status(400).json({
            status : 400,
            success : false,
            message : error.message
         })
    }
}
const getStoryByCategory = async (req,res,next) => {
    try{
       const response = await storyService.getStoriesByCategory(req.params?.category);

       return res.status(response.status).json({
          status : response.status,
          success : true,
          data : response.data,
          message : response.message
       })
    }catch(error){
        return res.status(400).json({
            status : 400,
            success : false,
            message : error.message
         })
    }
}

const getStoryById = async (req,res,next) => {
    try{
      const response = await storyService.getStoriesByUserId(req.user.userId);
      return res.status(response.status).json({
        status : response.status,
        success : true,
        data : response.data,
        message : response.message
      })
    }catch(error){
      return res.status(400).json({
        status : 400,
        success : false,
        message : error.message
      })
    }
}

const getBookmarkedStories = async (req,res,next) => {
    try{
        const response = await storyService.getBookmarkedStories(req.user.userId);
        return res.status(response.status).json({
            status : response.status,
            success : true,
            data : response.data,
            message : response.message
        })}catch(error){
            return res.status(400).json({
            status : 400,
            success : false,
            message : error.message
        });
    }
}

const getLikesCount = async (req,res,next) => {
    try{
      
    }catch(error){
     
    }
}

const checkStoryLikedByUser = async (req,res,next) => {
    try{
      const response = await storyService.checkStoryLikedByUser(req.user.userId,req.params.storyId);
      return res.status(response.status).json({
        status : response.status,
        likedByUser : response.likedByUser,
        message : response.message
      })
    }catch(error){
      return res.status(400).json({
        status : 400,
        message : error.message
      })
    }
}

const getAllStories = async (req,res,next) => {
    try{
      const response = await storyService.getAllStories();
      return res.status(response.status).json({
        status : response.status,
        data : response.data,
        message : response.message
      })
    }catch(error){
       return res.status(400).json({
         status : 400,
         message : error.message
       })
    }
}

module.exports = {
    createNewStory,
    updateStory,
    bookmarkStory,
    likeStory,
    getStoryByCategory,
    getStoryById,
    getBookmarkedStories,
    getLikesCount,
    getAllStories,
    checkStoryLikedByUser
}