import React from "react";

const Stock = ({ stock }) => {
  const { ticker, name, quantity, cost, date } = stock;
  return (
    <div className="stockFullDiv">
      <h4>
        {ticker} {name} {date}
      </h4>

      <span>
        Quantity: {quantity} Cost: ${cost} Total: ${quantity * cost}
      </span>
    </div>
  );
};

export default Stock;
