import axios from "axios";
require("../../secrets");

export const refreshTime = 5000; // HOW OFTEN PREMIUM UPDATES
export const updateCap = 10; // HOW MANY API HITS BEFORE TESTING AFK
const apiHitMaster = true; // HIT API OR USE TEST FNC INSTEAD
const logStockPulls = true; // LOG THE STOCK OUTPUTS
const sandBoxHit = false; // HIT SANDBOX OR CORE API

export const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return Date(date);
};

export const stockMasterPull = async ticker => {
  if (apiHitMaster) return await stockPullAPI(ticker);
  else return stockPullTest(ticker);
};

// API STOCK PULL FUNCTION
export const stockPullAPI = async ticker => {
  try {
    let stockData;

    // PULL ACTUAL STOCK PRICE INFORMATION
    if (sandBoxHit) {
      // SANDBOX API TOKEN FUNCTIONALITY
      const { data } = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote&filter=companyName,iexRealtimePrice,previousClose,latestPrice,change&token=${process.env.sandIEXAPIToken}`
      );
      stockData = data[ticker].quote;
    } else {
      // ACTUAL CORE API TOKEN FUNCTIONALITY
      const { data } = await axios.get(
        `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote&filter=companyName,iexRealtimePrice,previousClose,latestPrice,change&token=${process.env.trueIEXAPIToken}`
      );
      stockData = data[ticker].quote;
    }

    // CALCULATING AND LAYERING ON THE OPENING PRICE
    stockData.openingPrice = stockData.previousClose;
    if (logStockPulls) console.log("API STOCK -", stockData, Date());
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
      companyName: `${ticker} Test`,
      latestPrice: Math.floor(Math.random() * 75) + 5,
      openingPrice: Math.floor(Math.random() * 75) + 5,
      previousClose: Math.floor(Math.random() * 75) + 5
    };

    if (logStockPulls) console.log("TEST STOCK -", stockData, Date());
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
