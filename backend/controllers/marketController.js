const MarketData = require("../models/MarketData");

// Admin adds new item
exports.addMarketData = async (req, res) => {
  try {
    const { name, region, prices } = req.body;
    const data = await MarketData.create({ name, region, prices });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all market data
exports.getMarketData = async (req, res) => {
  try {
    const data = await MarketData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update data
exports.updateMarketData = async (req, res) => {
  try {
    const updated = await MarketData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete data
exports.deleteMarketData = async (req, res) => {
  try {
    await MarketData.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
