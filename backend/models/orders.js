const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
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
	buyer_id:{
		type: String,
		required: true
	},
	total_price: {
		type: Number,
		required: true
	},
	food_name:{
		type: String,
		required:true
	},
    food_id:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
	date:{
		type: Date,
		required: true
	},
	addon_name:{
		type: [String],
		required: false
    },
	quantity:{
		type: Number,
		required: true
	},
	is_rated:{
		type:String,
		required: true
	}
});

module.exports = order = mongoose.model("order", OrderSchema);
