const express = require("express");

const recipesDB = require("./recipeModel.js");

const middleware = require("../middleware");

const router = express.Router();

//GET
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

router.get("/:id/shoppingList", middleware.checkRecipeId, async (req, res) => {
	try {
		const ingredients = await recipesDB.getShoppingList(req.params.id);

		if (ingredients.length) {
			res.json(ingredients);
		} else {
			res
				.status(404)
				.json({ message: "There are no ingredients listed for this recipe." });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to get ingredients" });
	}
});

router.get("/:id/instructions", middleware.checkRecipeId, async (req, res) => {
	try {
		const instructions = await recipesDB.getInstructions(req.params.id);

		if (instructions.length) {
			res.json(instructions);
		} else {
			res
				.status(404)
				.json({ message: "There are no instructions for this recipe." });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to get instructions" });
	}
});

//POST
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

router.post(
	"/:id/instructions",
	middleware.checkRecipeId,
	middleware.checkInstruction,
	async (req, res) => {
		try {
			const instruction = await recipesDB.insertInstruction(
				req.params.id,
				req.body
			);
			res.status(201).json(instruction);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Failed to create new instruction" });
		}
	}
);

router.post("/:id/shoppingList", middleware.checkRecipeId, async (req, res) => {
	try {
		const { ingredient_id, quantity } = req.body;
		if (!ingredient_id || !quantity) {
			res.status(400).json({
				message:
					"Please ensure information for ingredient_id and quantity are included."
			});
		} else {
			const recipeIngredients = await recipesDB.addIngredToRecipe(
				req.params.id,
				ingredient_id,
				quantity
			);
			res.status(201).json(recipeIngredients);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to add ingredients to recipe" });
	}
});

//DELETE
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

//PUT
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
