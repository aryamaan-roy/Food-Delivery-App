const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	age:{
		type: Number,
		required:true
	},
	contact:{
		type: Number,
		required:true
	},
	batch:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	wallet:{
		type: Number,
		required: true
	},
	password:{
		type: String,
		required:true
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
