const recipeDB = require("./api/recipeModel.js");
const ingredientDB = require("./api/ingredientModel.js");
const stepDB = require("./api/stepModel.js");

module.exports = {
	checkRecipe,
	checkRecipeId,
	checkIngredient,
	checkIngredientId,
	checkStep,
	checkStepId
};

async function checkRecipeId(req, res, next) {
	try {
		const recipe = await recipeDB.getById(req.params.id);
		if (recipe) {
			req.recipe = recipe;
			next();
		} else {
			res.status(404).json({ message: "Recipe ID Could Not Be Found." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The recipe information could not be retrieved."
		});
	}
}

function checkRecipe(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing Recipe Data." });
	const { recipe_name } = req.body;
	if (!recipe_name)
		return res.status(400).json({
			message: "Please ensure information for recipe_name is included."
		});
	next();
}

async function checkIngredientId(req, res, next) {
	try {
		const ingredient = await ingredientDB.getById(req.params.id);
		if (ingredient) {
			req.ingredient = ingredient;
			next();
		} else {
			res.status(404).json({ message: "Ingredient ID Could Not Be Found." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The ingredient information could not be retrieved."
		});
	}
}

function checkIngredient(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing Ingredient Data." });
	const { ingredient_name } = req.body;
	if (!ingredient_name)
		return res.status(400).json({
			message: "Please ensure information for ingredient_name is included."
		});
	next();
}

async function checkStepId(req, res, next) {
	try {
		const step = await stepDB.getById(req.params.id);
		if (step) {
			req.step = step;
			next();
		} else {
			res.status(404).json({ message: "Step ID Could Not Be Found." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The step information could not be retrieved."
		});
	}
}

function checkStep(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing Step Data." });
	const { recipe_id, step_number, step_name } = req.body;
	if (!recipe_id || !step_number || !step_name)
		return res.status(400).json({
			message: "Please ensure information for step_name is included."
		});
	next();
}
