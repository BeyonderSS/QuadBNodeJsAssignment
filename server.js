const express = require("express");
const cors = require("cors");
const mongooseMiddleware = require("./middleware/mongoose");
const path = require("path");
const { fetchAndUpdateTickers } = require("./utils/tickerUpdater");
const fetchTickersMongoRoute = require("./routes/fetchTickersMongo"); // Import the new route

const app = express();
const port = 5001;

mongooseMiddleware.connect();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Use middleware to fetch and update tickers when the server starts
app.use(async (req, res, next) => {
  await fetchAndUpdateTickers();
  next();
});
app.use("/api", fetchTickersMongoRoute); // Use the new route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
