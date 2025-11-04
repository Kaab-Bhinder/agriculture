const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/market", require("./routes/marketRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

app.get("/", (req, res) => res.send("Smart Agriculture Market Tracker API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌾 Server running on port ${PORT}`));
