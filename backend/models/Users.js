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
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	Contact: {
		type: String,
		required: true
	},

	vendor:{
		type: Schema.Types.ObjectId,
		ref: 'Vendor',
	},
	buyer:{
		type: Schema.Types.ObjectId,
		ref: 'Buyer'
	}

});

const VendorSchema = new Schema({
	// I dont think we need this
	// Userid: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'User',
	// 	required: true
	// },
	shopname: {
		type: String,
		required: true
	},
	openingtime: {
		type: String,
		required: true
	},
	closingtime: {
		type: String,
		required: true
	},
	//toadd food items and their price
	// fooditems: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Fooditems'
	// }],
	// orders: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Orders'
	// }]
});

const BuyerSchema = new Schema({
	// I dont think we need this
	// Userid: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'User',
	// 	required: true
	// },
	age: {
		type: String,
		required: true
	},
	batchName: {
		type: String,
		required: true
	},
});

module.exports = {
	User: mongoose.model("User", UserSchema),
	Vendor: mongoose.model("Vendor", VendorSchema),
	Buyer: mongoose.model("Buyer", BuyerSchema)
}


// module.exports = User = mongoose.model("Users", UserSchema);
// module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
// module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);

