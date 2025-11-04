const mongoose = require("mongoose");

const marketDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  category: {
    type: String,
    enum: ["Fruit", "Vegetable", "Grain", "Spice"],
    required: true
  },
  unit: { type: String, default: "kg" },
  prices: { type: [Number], required: true },

  // ⭐ Ratings
  averageRating: { type: Number, default: 0 }, // e.g. 4.3
  ratingCount: { type: Number, default: 0 },   // total number of ratings

  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MarketData", marketDataSchema);
