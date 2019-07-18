const express = require("express");

const recipesDB = require("./recipeModel.js");

const middleware = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const recipes = await recipesDB.getAll(req.query);
		res.status(200).json(recipes);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The listing of recipes could not be retrieved."
		});
	}
});

router.get("/:id", middleware.checkRecipeId, async (req, res) => {
	try {
		res.status(200).json(req.recipe);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The information for the recipe specified could not be retrieved."
		});
	}
});

router.post("/", middleware.checkRecipe, async (req, res) => {
	try {
		const recipe = await recipesDB.insert(req.body);
		res.status(201).json(recipe);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "There was an error while adding the recipe to the database"
		});
	}
});

router.delete("/:id", middleware.checkRecipeId, async (req, res) => {
	try {
		const count = await recipesDB.remove(req.params.id);
		if (count > 0) {
			res.status(200).json(req.recipe);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The recipe could not be removed from the database"
		});
	}
});

router.put(
	"/:id",
	middleware.checkRecipeId,
	middleware.checkRecipe,
	async (req, res) => {
		try {
			const newrecipe = await recipesDB.update(req.params.id, req.body);
			res.status(200).json(newrecipe);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "something went wrong" });
		}
	}
);

module.exports = router;
