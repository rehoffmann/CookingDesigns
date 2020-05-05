const {recipeModel, validateRecipe} = require('../models/recipeModel');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req,res) => {
    //find all documents for class, can add query filters/regular expressions
   const data = await recipeModel.findById("5eb02853abc03d37b0550523");
   console.log("sending response from addrecipe get...");
    //res.send(data);
    res.render('singlerecipe', {
        title: 'Hello',
        recipe: data
    });
});

router.post('/', async (req, res) => {
    const {error} = validateRecipe(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let recipe = new recipeModel( {
        name: req.body.name,
        ingredientNames: req.body.ingredientNames,
        ingredientAmounts: req.body.ingredientAmounts,
        instructions: req.body.instructions,
        tags: req.body.tags
    });
    recipe = await recipe.save();
    res.redirect('/');
});


module.exports = router;
