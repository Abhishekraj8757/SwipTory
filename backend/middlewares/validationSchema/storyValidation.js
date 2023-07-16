const Joi = require('joi');
const validCategories = require('../../constants/storyCategories');

const createNewStorySchema = Joi.object({
    heading: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
    category: Joi.string().valid(...validCategories).required(),
  });

const updateStorySchema = Joi.object({
    heading: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.string(),
    category: Joi.string().valid(...validCategories),
}).min(1);

module.exports = {
    createNewStorySchema,
    updateStorySchema
}