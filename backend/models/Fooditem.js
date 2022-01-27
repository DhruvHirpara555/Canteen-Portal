const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Foodschema = new Schema({
    itemname: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["veg", "nonveg"],
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    rating: {
        type: Number,
        enum : [0,1,2,3,4,5],
        default: 0
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    }
});

module.exports = Fooditem = mongoose.model("Fooditem", Foodschema);