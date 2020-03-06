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
            Total Buy: $
            {buyTotal(port)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h2>
          <h2 className="tranSell">
            Total Sell: $
            {sellTotal(port)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TransactSum;
