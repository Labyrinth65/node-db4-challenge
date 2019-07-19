const db = require("../data/db-config.js");
const instructionsDB = require("./instructionsModel.js");

module.exports = {
	//getAll = getRecipes
	getAll: function() {
		return db("recipes");
	},

	getById: function(id) {
		return db("recipes")
			.where("id", id)
			.first();
	},

	getShoppingList: function(id) {
		return db("recipes_ingredients as j")
			.join("recipes as r", "j.recipe_id", "r.id")
			.join("ingredients as i", "j.ingredient_id", "i.id")
			.where("recipe_id", id)
			.select("r.recipe_name", "i.ingredient_name", "j.quantity")
			.orderBy("i.id");
	},

	getInstructions: function(id) {
		return db("steps as s")
			.join("recipes as r", "s.recipe_id", "r.id")
			.where("recipe_id", id)
			.select("r.recipe_name", "s.step_number", "s.step_name")
			.orderBy("step_number");
	},

	insert: function(recipe) {
		return db("recipes")
			.insert(recipe)
			.then(([id]) => this.getById(id).first());
	},

	insertInstruction: function(recipeId, instruction) {
		return db("steps")
			.insert({ ...instruction, recipe_id: recipeId })
			.then(([instructionID]) => instructionsDB.getById(instructionID).first());
	},

	addIngredToRecipe: function(recipe_id, ingredient_id, quantity) {
		return db("recipes_ingredients")
			.insert({
				recipe_id,
				ingredient_id,
				quantity
			})
			.then(() => this.getShoppingList(recipe_id));
	},

	delIngredFromRecipe: function(recipe_id, ingredient_id) {
		return db("recipes_ingredients")
			.where({ recipe_id, ingredient_id })
			.del()
			.then(count => (count > 0 ? this.getShoppingList(recipe_id) : 0));
	},

	update: function(id, changes) {
		return db("recipes")
			.where("id", id)
			.update(changes)
			.then(count => (count > 0 ? this.getById(id) : null));
	},

	remove: function(id) {
		return db("recipes")
			.where("id", id)
			.del();
	}
};
