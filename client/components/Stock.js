import React from "react";

const Stock = ({ stock }) => {
  const { ticker, name, quantity, curPrice, openPrice } = stock,
    totalVal = quantity * curPrice,
    priceDelta = priceCompare(openPrice, curPrice),
    arrow = arrowSymbol[priceDelta];

  return (
    <div className="stockFullDiv">
      <h4 className={`stockHeader stockColor${priceDelta}`}>
        {name} ({ticker}){" "}
        <span className="stockArrow">
          {priceDelta !== "Same" ? String.fromCharCode(arrow) : null}
        </span>
      </h4>

      <span className="stockSpan">
        Quantity: {quantity} Total Value: $
        {totalVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>

      <span className="stockSpan">
        Current Price: ${curPrice} Open Price: ${openPrice}
      </span>
    </div>
  );
};

const priceCompare = (open, cur) => {
  if (open === cur) return "Same";
  if (cur > open) return "Up";
  return "Down";
};

const arrowSymbol = {
  Same: 8663,
  Up: 8663,
  Down: 8664
};

export default Stock;
