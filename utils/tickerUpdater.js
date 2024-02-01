const axios = require("axios");
const Ticker = require("../models/Ticker");

const fetchAndUpdateTickers = async () => {
  try {
    // Fetch top 10 tickers from the WazirX API
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickersFromAPI = Object.values(response.data).slice(0, 10);

    console.log("Fetched top 10 tickers from the WazirX API.");

    // Iterate through the top 10 tickers and update or create entries in the database
    for (const tickerData of tickersFromAPI) {
      const existingTicker = await Ticker.findOne({ name: tickerData.name });

      if (existingTicker) {
        // If the ticker already exists, update its fields
        await Ticker.updateOne({ name: tickerData.name }, {
          last: tickerData.last,
          buy: tickerData.buy,
          sell: tickerData.sell,
          volume: tickerData.volume,
          base_unit: tickerData.base_unit,
        });

        console.log(`Updated existing ticker: ${tickerData.name}`);
      } else {
        // If the ticker doesn't exist, create a new entry
        const newTicker = new Ticker({
          name: tickerData.name,
          last: tickerData.last,
          buy: tickerData.buy,
          sell: tickerData.sell,
          volume: tickerData.volume,
          base_unit: tickerData.base_unit,
        });
        await newTicker.save();

        console.log(`Added new ticker: ${tickerData.name}`);
      }
    }

    console.log("Fetch and update successful.");
  } catch (error) {
    console.error("Error fetching and updating tickers:", error.message);
  }
};

module.exports = { fetchAndUpdateTickers };
