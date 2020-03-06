import React from "react";

const TransactSum = ({ port }) => {
  console.log("sum port -", port);
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
        <h2 className="tranHeader">Transaction Summary</h2>

        <div className="tranBSSum">
          <h3 className="tranBuy">
            Buy Total: $
            {buyTotal(port)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h3>
          <h3 className="tranSell">
            Sell Total: $
            {sellTotal(port)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TransactSum;
