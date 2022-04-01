const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
	vendor_id:{
        type: String,
        required: true
    },
	vendor_name:{
		type: String,
		required: true
	},
	vendor_shop:{
		type: String,
		required: true
	},
    name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	total:{
		type: Number,
		required:true
	},
	rate:{
		type: Number,
		required: true
	},
	date:{
		type: Date,
		required: true
	},
	vegornonveg:{
		type: String,
		required:true
	},
	tags:{
		type: [String],
		required: false
	},
	addon_name:{
		type: [String],
		required: false
	},
	addon_price:{
		type: [String],
		required:false
	}
});

module.exports = food = mongoose.model("Food", FoodSchema);
