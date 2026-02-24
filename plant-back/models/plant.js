const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  plantId: {
    type: String,
    required: true,
    unique: true,          // Ensure each plantId is unique
  },
  picture: {
    type: String,
    required: true,        // Plant image URL or path
  },
  category: {
    type: String,
    required: true,        // Indoor, Outdoor, etc.
  },
  name: {
    type: String,
    required: true,        // Plant name
  },
  description: {
    type: String,
    required: true,        // Short description of the plant
  },
  stock: {
    type: Number,
    required: true,        // Available quantity
  },
  price: {
    type: Number,
    required: true,        // Price per unit
  },
  newprice: {
    type: Number,
    required: true,        // New Price per unit
  },
  seller: {
    type: String,
    required: true,        // Seller name
  }
});

const PlantModel = mongoose.model("Plant", plantSchema);
module.exports = PlantModel;