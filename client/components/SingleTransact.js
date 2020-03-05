import React from "react";

const SingleTransact = ({ stock }) => {
  const { ticker, name, quantity, value, date } = stock,
    totalCost = quantity * value,
    dateObj = new Date(date);

  return (
    <div className="singleTransactFullDiv">
      <h4 className="singleTransHeader">
        {ticker} {name} {dateObj.toDateString()}
      </h4>

      <span className="singleTransSpan">
        Quantity: {quantity} Cost: ${value} Total: $
        {totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>
    </div>
  );
};

export default SingleTransact;
