const db = require("../data/db-config.js");

module.exports = {
	getAll: function() {
		return db("steps");
	},
	getById: function(id) {
		return db("steps")
			.where("id", id)
			.first();
	},
	update: function(id, changes) {
		return db("steps")
			.where("id", id)
			.update(changes)
			.then(count => (count > 0 ? this.getById(id) : null));
	},
	remove: function(id) {
		return db("steps")
			.where("id", id)
			.del();
	}
};
