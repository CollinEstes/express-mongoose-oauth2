// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	twitter: {
		id: String,
		token: String,
		name: String,
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	github: {
		id: String,
		name: String,
		email: String
	},
	coinbase: {
		id: String,
		name: String,
		email: String
	},
	join_date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', userSchema);
