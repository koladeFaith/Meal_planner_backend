// routes/recipeRoutes.js
const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes");
const authMiddleware = require("../middleware/user.middleware");

router.post("/recipes", authMiddleware, async (req, res) => {
    try {
        const { title, category, time, rating, ingredients, steps, image } = req.body;

        const recipe = new Recipe({
            title,
            category,
            time,
            rating,
            ingredients: ingredients.split(",").map((i) => i.trim()), // 
            steps,
            image,
            createdBy: req.user.id, // 
        });

        await recipe.save();
        res.status(201).json({ message: "Recipe created successfully", recipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/recipes", async (req, res) => {
    const recipes = await Recipe.find().populate("createdBy", "fullName email");
    res.json(recipes);
});

module.exports = router;
