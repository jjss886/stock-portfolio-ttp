import React from "react";

const SingleTransact = ({ stock }) => {
  const { ticker, name, quantity, value, date, action } = stock,
    text = action === "buy" ? "Bought" : "Sold",
    totalCost = quantity * value,
    dateObj = new Date(date);

  return (
    <div className="singleTransactFullDiv">
      <div className="transTextDiv">
        <h4 className="singleTransHeader">
          {name.length > 15 ? `${name.slice(0, 15)}...` : name} ({ticker})
        </h4>

        <h4 className="singleTransHeader">{dateObj.toDateString()}</h4>
      </div>

      <div className="transTextDiv">
        <span className="singleTransSpan">Quantity: {quantity}</span>

        <span className="singleTransSpan">
          {text}: ${value}
        </span>

        <span className="singleTransSpan">
          Total Value: $
          {totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
    </div>
  );
};

export default SingleTransact;
