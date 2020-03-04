import axios from "axios";

if (process.env.NODE_ENV !== "production") require("../../secrets");

export const stockPull = async ticker => {
  if (!ticker) return { empty };
  const { data: stockData } = await axios.get(
    `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexAPIToken}`
  );
  console.log("Stock -", stockData);
  return stockData;
};
