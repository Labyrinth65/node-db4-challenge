const express = require("express");

const ingredientsDB = require("./ingredientModel.js");

const middleware = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const ingredients = await ingredientsDB.getAll(req.query);
		res.status(200).json(ingredients);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The listing of ingredients could not be retrieved."
		});
	}
});

router.get("/:id", middleware.checkIngredientId, async (req, res) => {
	try {
		res.status(200).json(req.ingredient);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error:
				"The information for the ingredient specified could not be retrieved."
		});
	}
});

router.get("/:id/recipes", middleware.checkIngredientId, async (req, res) => {
	try {
		const recipes = await ingredientsDB.getRecipes(req.params.id);

		if (recipes.length) {
			res.json(recipes);
		} else {
			res
				.status(404)
				.json({ message: "There are no recipes listed for this ingredient." });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to get recipes" });
	}
});

router.post("/", middleware.checkIngredient, async (req, res) => {
	try {
		const ingredient = await ingredientsDB.insert(req.body);
		res.status(201).json(ingredient);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "There was an error while adding the ingredient to the database"
		});
	}
});

router.delete("/:id", middleware.checkIngredientId, async (req, res) => {
	try {
		const count = await ingredientsDB.remove(req.params.id);
		if (count > 0) {
			res.status(200).json(req.ingredient);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The ingredient could not be removed from the database"
		});
	}
});

router.put(
	"/:id",
	middleware.checkIngredientId,
	middleware.checkIngredient,
	async (req, res) => {
		try {
			const newingredient = await ingredientsDB.update(req.params.id, req.body);
			res.status(200).json(newingredient);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "something went wrong" });
		}
	}
);

module.exports = router;
