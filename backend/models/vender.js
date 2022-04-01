const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VenderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact:{
		type: Number,
		required:true
	},
	shop:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	password:{
		type: String,
		required:true
	},
    Open:{
        type: String,
        required:true
    },
    Close:{
        type: String,
        required:true
    }
});

module.exports = vender = mongoose.model("Venders", VenderSchema);
