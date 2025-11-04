const MarketData = require("../models/MarketData");

// Admin adds new item
exports.addMarketData = async (req, res) => {
  try {
    const { name, region, category, unit, prices } = req.body;
    const data = await MarketData.create({ name, region, category, unit, prices });
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

// Update existing data (admin)
exports.updateMarketData = async (req, res) => {
  try {
    const updated = await MarketData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete data (admin)
exports.deleteMarketData = async (req, res) => {
  try {
    await MarketData.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🌱 Seed sample market data
exports.seedMarketData = async (req, res) => {
  try {
    const sampleData = [
      {
        name: "Tomato",
        region: "Lahore",
        category: "Vegetable",
        unit: "kg",
        prices: [60, 62, 65, 64, 66, 68, 70]
      },
      {
        name: "Wheat",
        region: "Multan",
        category: "Grain",
        unit: "kg",
        prices: [120, 118, 122, 121, 123, 125, 124]
      },
      {
        name: "Mango",
        region: "Hyderabad",
        category: "Fruit",
        unit: "dozen",
        prices: [200, 210, 220, 215, 230, 225, 235]
      },
      {
        name: "Turmeric",
        region: "Karachi",
        category: "Spice",
        unit: "kg",
        prices: [450, 455, 460, 470, 465, 480, 490]
      }
    ];

    // Remove old data before seeding (optional)
    await MarketData.deleteMany();

    // Insert new data
    const result = await MarketData.insertMany(sampleData);

    res.json({
      message: "✅ Market data seeded successfully!",
      count: result.length,
      data: result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ 
        message: "Rating must be between 1 and 5" 
      });
    }

    const item = await MarketData.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "Market data not found" });
    }

    // Check if user already rated
    const existingRating = item.ratings.find(
      r => r.userId.toString() === userId
    );

    if (existingRating) {
      // Update existing rating
      const oldRating = existingRating.rating;
      existingRating.rating = rating;
      
      // Recalculate average
      const totalRatings = item.averageRating * item.ratingCount;
      const newAverage = (totalRatings - oldRating + rating) / item.ratingCount;
      item.averageRating = parseFloat(newAverage.toFixed(2));
      
      await item.save();
      
      return res.json({
        message: "Rating updated successfully",
        data: {
          name: item.name,
          averageRating: item.averageRating,
          ratingCount: item.ratingCount
        }
      });
    }

    // Add new rating
    item.ratings.push({ userId, rating });
    
    const totalRatings = item.averageRating * item.ratingCount;
    const newRatingCount = item.ratingCount + 1;
    const newAverageRating = (totalRatings + rating) / newRatingCount;
    
    item.averageRating = parseFloat(newAverageRating.toFixed(2));
    item.ratingCount = newRatingCount;
    
    await item.save();

    res.json({
      message: "Rating added successfully",
      data: {
        name: item.name,
        averageRating: item.averageRating,
        ratingCount: item.ratingCount
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};