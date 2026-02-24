const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true }, // Product name
    category: { type: String, required: true }, // Indoor, Outdoor, Flowering, etc.
    seller: { type: String, required: true }, // Seller name from dropdown
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;