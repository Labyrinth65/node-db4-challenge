exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("ingredients")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("ingredients").insert([
				{ ingredient_name: "ounce(s) of unsalted butter" },
				{ ingredient_name: "ounce(s) of all-purpose flour" },
				{ ingredient_name: "teaspoon(s) of baking soda" },
				{ ingredient_name: "teaspoon(s) of kosher salt" },
				{ ingredient_name: "ounce(s) of granulated sugar" },
				{ ingredient_name: "each(s) of large egg" },
				{ ingredient_name: "teaspoon(s) of vanilla extract" },
				{ ingredient_name: "ounce(s) of dark brown sugar" },
				{ ingredient_name: "ounce(s) of semisweet chocolate, chopped roughly" },
				{ ingredient_name: "pound(s) of lean ground beef" },
				{ ingredient_name: "cup(s) of fresh bread crumbs" },
				{ ingredient_name: "tablespoon(s) of dried parsley" },
				{ ingredient_name: "tablespoon(s) of grated Parmesan cheese" },
				{ ingredient_name: "teaspoon(s) of ground black pepper" },
				{ ingredient_name: "teaspoon(s) of garlic powder" },
				{ ingredient_name: "ounce(s) of 00 flour" },
				{ ingredient_name: "teaspoon(s) of instant yeast" },
				{ ingredient_name: "ounces(s) of water" },
				{
					ingredient_name:
						"ounces(s) of canned whole peeled San Marzano tomatoes"
				},
				{ ingredient_name: "ounces(s) of mozzarella cheese" },
				{ ingredient_name: "tablespoons(s) of extra virgin olive oil" },
				{ ingredient_name: "each(s) of basil leaves" }
			]);
		});
};
