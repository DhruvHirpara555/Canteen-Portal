const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    fooditem : {
        type: Schema.Types.ObjectId,
        ref: "Fooditem",
        required: true
    },
    status: {
        type: String,
        enum: ["placed", "accepted","cooking","ready", "rejected"],
        default: "placed"
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "Buyer",
        required: true
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    }
});

module.exports = Order = mongoose.model("Order", orderSchema);