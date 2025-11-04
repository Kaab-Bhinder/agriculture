const express = require("express");
const { addMarketData, getMarketData, updateMarketData, deleteMarketData } = require("../controllers/marketController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth("admin"), addMarketData);
router.get("/", getMarketData);
router.put("/:id", auth("admin"), updateMarketData);
router.delete("/:id", auth("admin"), deleteMarketData);

module.exports = router;
