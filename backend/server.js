const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

var app = express();

// Allow requests from the frontend
app.use(cors({ origin: process.env.CLIENT_URL }));

// Parse incoming JSON requests
app.use(express.json());

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Error:", err));

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});