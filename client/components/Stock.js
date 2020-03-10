import React from "react";

const Stock = ({ stock }) => {
  const { ticker, name, quantity, curPrice, openPrice } = stock,
    totalVal = Math.round(quantity * curPrice),
    priceDelta = priceCompare(openPrice, curPrice),
    arrow = arrowSymbol[priceDelta];

  return (
    <div className="stockFullDiv">
      <h4 className={`stockHeader stockColor${priceDelta}`}>
        {name.length > 20 ? `${name.slice(0, 20)}...` : name} ({ticker}){" "}
        <span className="stockArrow">
          {priceDelta !== "Same" ? String.fromCharCode(arrow) : null}
        </span>
      </h4>

      <div className="stockSpanDiv">
        <span className="stockSpan stockSpanOne">
          Quantity: <strong>{quantity}</strong>
        </span>

        <span className="stockSpan">
          Total Value:&nbsp;
          <strong>
            ${totalVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        </span>
      </div>

      <div className="stockSpanDiv">
        <span className="stockSpan stockSpanOne">
          Current Price: <strong>${curPrice}</strong>
        </span>

        <span className="stockSpan">
          Open Price: <strong>${openPrice}</strong>
        </span>
      </div>
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
