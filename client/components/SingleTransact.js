import React from "react";

const SingleTransact = ({ stock }) => {
  const { ticker, name, quantity, value, date, action } = stock,
    text = action === "buy" ? "Bought" : "Sold",
    totalCost = Math.round(quantity * value),
    dateObj = new Date(date);

  return (
    <div className="singleTransactFullDiv">
      <div className="transTextDiv">
        <h4 className="singleTransHeader">
          {name.length > 12 ? `${name.slice(0, 12)}...` : name} ({ticker})
        </h4>

        <h4 className="singleTransHeader">{dateObj.toDateString()}</h4>
      </div>

      <div className="transTextDiv">
        <span className="singleTransSpan">
          Quantity: <span className="singTransBold">{quantity}</span>
        </span>

        <span className="singleTransSpan">
          {text}: <span className="singTransBold">${Math.round(value)}</span>
        </span>

        <span className="singleTransSpan">
          Total Value:{" "}
          <span className="singTransBold">
            ${totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </span>
      </div>
    </div>
  );
};

export default SingleTransact;
