const express = require('express');
const router = express.Router();
const recipeController = require("../controller/recipecontroller");

router.post('/', recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);
router.put('/recipes/:id', recipeController.updateRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);

module.exports = router;