exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("recipes")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("recipes").insert([
				{ recipe_name: "Chocolate Chip Cookies" },
				{ recipe_name: "Meatballs" },
				{ recipe_name: "Margherita Pizza" }
			]);
		});
};
