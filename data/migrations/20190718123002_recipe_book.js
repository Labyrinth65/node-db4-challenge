exports.up = function(knex) {
	return knex.schema
		.createTable("recipes", tbl => {
			tbl.increments();
			tbl
				.text("recipe_name")
				.unique()
				.notNullable();
		})
		.createTable("ingredients", tbl => {
			tbl.increments();
			tbl
				.text("ingredient_name")
				.unique()
				.notNullable();
		})
		.createTable("recipes_ingredients", tbl => {
			tbl.increments();
			tbl
				.integer("recipe_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("recipes")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl
				.integer("ingredient_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("ingredients")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl
				.decimal("quantity", 2)
				.unsigned()
				.notNullable();
		})
		.createTable("steps", tbl => {
			tbl.increments();
			tbl
				.integer("recipe_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("recipes")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl
				.integer("step_number")
				.unsigned()
				.notNullable();
			tbl.text("step_name").notNullable();
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("recipes")
		.dropTableIfExists("ingredients")
		.dropTableIfExists("steps")
		.dropTableIfExists("recipes_ingredients");
};
