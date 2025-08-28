
// models/Recipe.js
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        time: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5 },
        ingredients: { type: [String], required: true },
        steps: { type: String, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
