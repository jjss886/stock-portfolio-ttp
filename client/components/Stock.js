import React from "react";

const Stock = ({ stock }) => {
  const { ticker, name, quantity, cost } = stock,
    totalCost = quantity * cost;

  return (
    <div className="stockFullDiv">
      <h4>
        {ticker} {name}
      </h4>

      <span>
        Quantity: {quantity} Cost: ${cost} Total: $
        {totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>
    </div>
  );
};

export default Stock;
