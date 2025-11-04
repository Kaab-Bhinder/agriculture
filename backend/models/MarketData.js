const mongoose = require("mongoose");

const marketDataSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. Tomato
  region: { type: String, required: true }, // e.g. Lahore
  prices: { type: [Number], required: true }, // 7-day price data
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MarketData", marketDataSchema);
