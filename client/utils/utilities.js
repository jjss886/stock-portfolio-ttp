import axios from "axios";
if (process.env.NODE_ENV !== "production") require("../../secrets");

export const refreshTime = 15000;
export const updateCap = 10;

export const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return Date(date);
};

// API STOCK PULL FUNCTION
export const stockPull = async ticker => {
  try {
    // PULL ACTUAL STOCK PRICE INFORMATION
    const { data: stockData } = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexAPIToken}`
    );

    console.log("API STOCK HIT ! -", stockData, new Date());
    return stockData;
  } catch (error) {
    console.error("Stock Error -", error);
    return false;
  }
};

// DUMMY STOCK PULL FUNCTION TO AVOID HITTING API DURING TESTING
export const stockPullTest = ticker => {
  try {
    // CREATE DUMMY STOCK PRICE INFORMATION
    const stockData = {
      ticker,
      companyName: "Testing Ticker",
      latestPrice: Math.floor(Math.random() * 30) + 5,
      openingPrice: Math.floor(Math.random() * 30) + 5,
      previousClose: Math.floor(Math.random() * 30) + 5
    };

    // console.log("TEST STOCK HIT ! -", stockData, new Date());
    return stockData;
  } catch (error) {
    console.error("Stock Error -", error);
    return false;
  }
};

// CONSOLIDATING PORTFOLIO TO JUST SHOW UNIQUE AND AGGREGATE QUANTITY
export const hashStock = port => {
  return port.reduce((acm, val) => {
    const { ticker, quantity, action } = val;

    if (ticker in acm) {
      if (action === "buy") acm[ticker].quantity += quantity;
      else acm[ticker].quantity -= quantity;
    } else acm[ticker] = Object.assign({}, val);

    if (acm[ticker].quantity === 0) delete acm[ticker];

    return acm;
  }, {});
};
