const db = require("../data/db-config.js");

module.exports = {
	getAll: function() {
		return db("recipes");
	},
	getById: function(id) {
		return db("recipes")
			.where("id", id)
			.first();
	},
	insert: function(recipe) {
		return db("recipes")
			.insert(recipe)
			.then(([id]) => this.getById(id).first());
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
