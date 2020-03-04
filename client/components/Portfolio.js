import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio } from "../store";

import Stock from "./Stock";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class Portfolio extends Component {
  componentDidMount() {
    const { getPortfolio, user } = this.props;
    if (user.id) getPortfolio(user.id);
  }

  componentDidUpdate(prevProps) {
    const { getPortfolio, user } = this.props;
    if (user.id && user.id !== prevProps.user.id) getPortfolio(user.id);
  }

  postList = port => {
    const hash = port.reduce((acm, val) => {
      const { ticker, quantity } = val;
      ticker in acm ? (acm[ticker].quantity += quantity) : (acm[ticker] = val);
      return acm;
    }, {});

    let totalVal = 0;

    Object.keys(hash).forEach(key => {
      // NEED TO ADD IN STOCK VALUE AND OPENING!
      hash[key].curPrice = Math.floor(Math.random() * 30) + 5;
      hash[key].openPrice = Math.floor(Math.random() * 30) + 5;

      // ACCUMULATING TOTAL PORTFOLIO VALUE
      totalVal += hash[key].curPrice * hash[key].quantity;
    });

    return [totalVal, Object.values(hash)];
  };

  render() {
    const { portfolio, user } = this.props,
      [totalVal, adjPortfolio] = this.postList(portfolio);

    return (
      <div className="portFullDiv">
        {portfolio.length ? (
          <div className="allStockDiv">
            <h4 className="portValueHeader">
              Portfolio Value: $
              {totalVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h4>

            {adjPortfolio.map((stock, idx) => (
              <Stock key={idx} stock={stock} />
            ))}
          </div>
        ) : (
          <h3>Loading</h3>
        )}

        <div className="portActionDiv">
          <h4 className="cashHeader">
            Cash: $
            {user.cash
              ? user.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : 0}
          </h4>

          <div className="portFormFullDiv">
            <BuyForm />

            <SellForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    portfolio: state.portfolio
  };
};

const mapDispatch = dispatch => {
  return {
    getPortfolio: userId => dispatch(getPortfolio(userId))
  };
};

export default connect(mapState, mapDispatch)(Portfolio);
