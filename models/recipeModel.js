const mongoose = require('mongoose');
const Joi = require('joi');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredientNames:[String],
    ingredientAmounts:[Number],
    instructions:[String],
    tags: [String],
    date: {type: Date, default: Date.now}
});

//create model for Schema, determine which collection to store it in
const recipeModel = mongoose.model('recipeCollection', recipeSchema);


function validateRecipe(recipe) {
    const schema = {
      name: Joi.string().min(3).required(),
      ingredientNames: Joi.array(),
      ingredientAmounts: Joi.array(),
      instructions: Joi.array(),
      tags: Joi.array()
    };
  
    return Joi.validate(recipe, schema);
  }

exports.recipeModel = recipeModel;
exports.validateRecipe = validateRecipe;