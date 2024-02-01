const express = require("express");
const Ticker = require("../models/Ticker");

const router = express.Router();

router.get("/fetchtickersmongo", async (req, res) => {
  try {
    // Fetch all tickers from the database
    const tickers = await Ticker.find();

    // Return the tickers as JSON in the response
    res.json(tickers);
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    console.error("Error fetching tickers from the database:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
