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
          {name.length > 12 ? `${name.slice(0, 12)}...` : name} ({ticker})
        </h4>

        <h4 className="singleTransHeader">{dateObj.toDateString()}</h4>
      </div>

      <div className="transTextDiv">
        <span className="singleTransSpan">
          Quantity: <strong>{quantity}</strong>
        </span>

        <span className="singleTransSpan">
          {text}: <strong>${value}</strong>
        </span>

        <span className="singleTransSpan">
          Total Value:{" "}
          <strong>
            ${totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default SingleTransact;
