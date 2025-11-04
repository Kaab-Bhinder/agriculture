const express = require("express");
const { addMarketData, getMarketData, updateMarketData, deleteMarketData, seedMarketData } = require("../controllers/marketController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Admin routes
router.post("/", auth("admin"), addMarketData);
router.put("/:id", auth("admin"), updateMarketData);
router.delete("/:id", auth("admin"), deleteMarketData);

// Public routes
router.get("/", getMarketData);

// Rating route (for farmers)
// router.post("/:id/rate", auth(), addRating);

// 🌱 Seed data (admin only)
router.post("/seed", auth("admin"), seedMarketData);


module.exports = router;
