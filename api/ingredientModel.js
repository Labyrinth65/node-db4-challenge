const db = require("../data/db-config.js");

module.exports = {
	getAll: function() {
		return db("ingredients");
	},
	getById: function(id) {
		return db("ingredients")
			.where("id", id)
			.first();
	},
	getRecipes: function(id) {
		return db("recipes_ingredients as j")
			.join("recipes as r", "j.recipe_id", "r.id")
			.join("ingredients as i", "j.ingredient_id", "i.id")
			.where("ingredient_id", id)
			.select("i.ingredient_name", "r.recipe_name", "j.quantity")
			.orderBy("r.id");
	},
	insert: function(recipe) {
		return db("ingredients")
			.insert(recipe)
			.then(([id]) => this.getById(id).first());
	},
	update: function(id, changes) {
		return db("ingredients")
			.where("id", id)
			.update(changes)
			.then(count => (count > 0 ? this.getById(id) : null));
	},
	remove: function(id) {
		return db("ingredients")
			.where("id", id)
			.del();
	}
};
