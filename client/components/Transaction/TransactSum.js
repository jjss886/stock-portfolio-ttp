import React from "react";

const TransactSum = ({ port }) => {
  const buyTotal = port =>
    port.reduce((acm, val) => {
      if (val.action === "buy") acm += val.value * val.quantity;
      return acm;
    }, 0);

  const sellTotal = port =>
    port.reduce((acm, val) => {
      if (val.action === "sell") acm += val.value * val.quantity;
      return acm;
    }, 0);

  return (
    <div className="tranSumFullDiv">
      <div className="tranInsideDiv">
        <h1 className="tranHeader">Transaction Summary</h1>

        <div className="tranBSSum">
          <h2 className="tranBuy">
            Total Bought: $
            <span className="moneyBalance">
              {Math.round(buyTotal(port))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </h2>

          <h2 className="tranSell">
            Total Sold: $
            <span className="moneyBalance">
              {Math.round(sellTotal(port))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TransactSum;
