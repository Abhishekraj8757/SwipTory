const express = require('express');
const storyRouter = express.Router();
const storyController = require('../controllers/storiesController');
const {isAuthenticated} = require('../middlewares/authentication');
const validateRequest = require('../middlewares/validateRequest');
const storySchema = require('../middlewares/validationSchema/storyValidation');

//route for creating a story
storyRouter.post('/', validateRequest(storySchema.createNewStorySchema), isAuthenticated, storyController.createNewStory);

//route for updating a story
storyRouter.put('/:storyId', validateRequest(storySchema.updateStorySchema), isAuthenticated, storyController.updateStory);

//route to get all the bookmarked story of a user
//still left to be done
storyRouter.get('/bookmark',isAuthenticated,storyController.getBookmarkedStories );

//route for bookmarking a story
storyRouter.post('/bookmark/:storyId',isAuthenticated, storyController.bookmarkStory);

//route for liking a story
storyRouter.post('/like/:storyId',isAuthenticated, storyController.likeStory);

//route to get all the stories of a user
storyRouter.get('/user',isAuthenticated, storyController.getStoryById);

//route to get all the stories of a particular cateogory
storyRouter.get('/:category',storyController.getStoryByCategory);

//route to get all the stories
storyRouter.get('/', storyController.getAllStories);



//route to get likes on a story
storyRouter.get('');

//route to check particular story liked by a user
storyRouter.get('/:storyId/liked',isAuthenticated,storyController.checkStoryLikedByUser);



module.exports = storyRouter;