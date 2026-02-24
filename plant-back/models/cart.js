const mongoose = require("mongoose");

// Cart Schema & Model
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // Product name
  category: { type: String, required: true }, // Product category
  seller: { type: String, required: true }, // ✅ Seller name
  price: { type: Number, required: true }, // Product price
  picture: { type: String, required: true }, // Product image URL or path
  quantity: { type: Number, default: 1 }, // ✅ Quantity (default to 1)
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;