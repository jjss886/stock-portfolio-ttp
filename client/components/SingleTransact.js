import React from "react";

const SingleTransact = ({ stock }) => {
  const { ticker, name, quantity, value, date, action } = stock,
    totalCost = quantity * value;

  return (
    <div className="singleTransactFullDiv">
      <h4>
        {ticker} {name} {date} {action}
      </h4>

      <span>
        Quantity: {quantity} Cost: ${value} Total: $
        {totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>
    </div>
  );
};

export default SingleTransact;
