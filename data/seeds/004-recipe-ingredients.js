exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("recipes_ingredients")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("recipes_ingredients").insert([
				{ recipe_id: 1, ingredient_id: 1, quantity: 8 },
				{ recipe_id: 1, ingredient_id: 2, quantity: 10 },
				{ recipe_id: 1, ingredient_id: 3, quantity: 0.75 },
				{ recipe_id: 1, ingredient_id: 4, quantity: 2 },
				{ recipe_id: 1, ingredient_id: 5, quantity: 5 },
				{ recipe_id: 1, ingredient_id: 6, quantity: 2 },
				{ recipe_id: 1, ingredient_id: 7, quantity: 2 },
				{ recipe_id: 1, ingredient_id: 8, quantity: 5 },
				{ recipe_id: 1, ingredient_id: 9, quantity: 8 },
				{ recipe_id: 2, ingredient_id: 10, quantity: 1 },
				{ recipe_id: 2, ingredient_id: 11, quantity: 1 },
				{ recipe_id: 2, ingredient_id: 12, quantity: 1 },
				{ recipe_id: 2, ingredient_id: 13, quantity: 1 },
				{ recipe_id: 2, ingredient_id: 14, quantity: 0.25 },
				{ recipe_id: 2, ingredient_id: 15, quantity: 0.25 },
				{ recipe_id: 2, ingredient_id: 6, quantity: 1 },
				{ recipe_id: 3, ingredient_id: 16, quantity: 20 },
				{ recipe_id: 3, ingredient_id: 4, quantity: 2 },
				{ recipe_id: 3, ingredient_id: 17, quantity: 1 },
				{ recipe_id: 3, ingredient_id: 5, quantity: 2 },
				{ recipe_id: 3, ingredient_id: 18, quantity: 12 },
				{ recipe_id: 3, ingredient_id: 19, quantity: 14 },
				{ recipe_id: 3, ingredient_id: 20, quantity: 12 },
				{ recipe_id: 3, ingredient_id: 21, quantity: 6 },
				{ recipe_id: 3, ingredient_id: 22, quantity: 24 }
			]);
		});
};
