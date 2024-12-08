const mongoose = require("mongoose");

const newschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      ingredients: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Recipes = mongoose.model("Recipes",newschema);
module.exports = Recipes