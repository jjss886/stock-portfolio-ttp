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
    console.log("Stock -", stockData);
    return stockData;
  } catch (error) {
    // SEND BACK ERROR
    console.error("Stock Error -", error);
    return false;
  }
};
