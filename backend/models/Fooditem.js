const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Foodschema = new Schema({
    itemname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["veg", "nonveg"],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    }
});

mongoose.exports = Fooditems = mongoose.model("Fooditems", Foodschema);