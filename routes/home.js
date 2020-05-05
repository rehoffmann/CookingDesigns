const {recipeModel, validateRecipe} = require('../models/recipeModel');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', async (req,res) => {
        //find all documents for class, can add query filters/regular expressions
       const data = await recipeModel.findById("5eb02853abc03d37b0550523");
        //res.send(data);
        res.render('singlerecipe', {
            title: 'Hello',
            recipe: data
        });
    });

/*router.get('/:id', async (req, res) => {
        const data = await recipeModel.findById(req.params.id);
        //404 Not Found
        if (!data) return res.status(404).send('Not Found');
        res.send(data);
     });*/

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

/*router.put('/:id', async (req,res) => {
    //validate, if bad entry return 400
    const {error} = validateRecipe(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const data = await recipeModel.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true,
        useFindAndModify: false
    });

    //look up course, if doesnt exist return 404
    if (!data) return res.status(404).send('Not Found');
   
    res.send(data);
});*/

router.delete('/:name', async (req,res) => {
    const data = await recipeModel.deleteMany({name: req.params.name}, {useFindAndModify: false});

    if (!data) return res.status(404).send('Not Found');
    //delete

    res.send(data);
})

router.delete('/:id', async (req,res) => {
    const data = await recipeModel.findByIdAndRemove(req.params.id, {useFindAndModify: false});

    if (!data) return res.status(404).send('Not Found');
    //delete

    res.send(data);
})

module.exports = router;


//there is also a third update method that combines both, findbyidandupdate

//delete from database
//can also use deleteOne or deleteMany, not sure what the differences are

//updateMany('5ea63bbfba46fc47142599b0');

//VALIDATION: should use both Joi (for client-side) and mongoose (for db-side)