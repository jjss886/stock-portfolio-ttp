import axios from "axios";
if (process.env.NODE_ENV !== "production") require("../../secrets");

export const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return Date(date);
};

export const stockPull = async ticker => {
  try {
    // PULL STOCK PRICE INFORMATION
    const { data: stockData } = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexAPIToken}`
    );
    console.log("API HIT ! -", stockData);
    return stockData;
  } catch (error) {
    // SEND BACK ERROR
    console.error("Stock Error -", error);
    return false;
  }
};

// DUMMY STOCK PULL FUNCTION TO AVOID HITTING API DURING TESTING
export const stockPullTest = ticker => {
  try {
    // PULL STOCK PRICE INFORMATION
    const stockData = {
      ticker,
      name: "Testing Ticker",
      latestPrice: Math.floor(Math.random() * 30) + 5,
      openingPrice: Math.floor(Math.random() * 30) + 5
    };
    return stockData;
  } catch (error) {
    // SEND BACK ERROR
    console.error("Stock Error -", error);
    return false;
  }
};
