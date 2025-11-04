const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
// additionally try to load a weather API key file if present (weatherapikey.env)
dotenv.config({ path: path.join(__dirname, 'weatherapikey.env') });

// Diagnostic: log whether the weather API key is present (do not print the key)
console.log('WEATHER_API_KEY present:', !!process.env.WEATHER_API_KEY);
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/market", require("./routes/marketRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));

app.get("/", (req, res) => res.send("Smart Agriculture Market Tracker API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌾 Server running on port ${PORT}`));
