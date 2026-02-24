const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["bogo", "percentage"], required: true },
  product: { type: String, required: true }, // Product name for the offer
  details: { type: String }, // Extra description, e.g., "Buy 1 get 1 free"
  percentage: { type: Number }, // Optional if type is percentage
  image: { type: String },
  newPrice: {
    type: Number,
    required: true,        // New Price per unit
  } // URL or path of the discount/product image
});

const discountModel = mongoose.model("discounts", discountSchema);
module.exports = { discountModel };
