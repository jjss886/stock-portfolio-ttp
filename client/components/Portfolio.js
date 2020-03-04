import React, { Component } from "react";
import { connect } from "react-redux";
import { hashStock } from "../utils/utilities";
import { getPortfolio, getLiveStock } from "../store";

import Stock from "./Stock";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class Portfolio extends Component {
  componentDidMount() {
    const { getPortfolio, user } = this.props;
    if (user.id) getPortfolio(user.id);
  }

  componentDidUpdate(prevProps) {
    const { getPortfolio, user, portfolio, getLiveStock } = this.props;
    if (user.id && user.id !== prevProps.user.id) getPortfolio(user.id);
    if (portfolio.length && portfolio.length !== prevProps.portfolio.length) {
      getLiveStock(hashStock(portfolio.slice()));
    }
  }

  postList = port => {
    const hash = hashStock(port),
      { stocks } = this.props;
    let totalVal = 0;

    if (Object.keys(stocks).length) {
      Object.keys(hash).forEach(key => {
        // ADDING IN STOCK VALUE AND OPENING!
        if (!(key in stocks)) {
          stocks[key] = {};
          stocks[key].latestPrice = 0;
          stocks[key].openingPrice = 0;
        }
        hash[key].curPrice = stocks[key].latestPrice;
        hash[key].openPrice = stocks[key].openingPrice;

        // ACCUMULATING TOTAL PORTFOLIO VALUE
        totalVal += hash[key].curPrice * hash[key].quantity;
      });
    }

    return [
      totalVal,
      Object.values(hash).sort(
        (a, b) => b.quantity * b.curPrice - a.quantity * a.curPrice
      )
    ];
  };

  render() {
    const { portfolio, user } = this.props,
      [totalVal, adjPortfolio] = this.postList(portfolio.slice());

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
    portfolio: state.portfolio,
    stocks: state.stocks
  };
};

const mapDispatch = dispatch => {
  return {
    getPortfolio: userId => dispatch(getPortfolio(userId)),
    getLiveStock: portfolio => dispatch(getLiveStock(portfolio))
  };
};

export default connect(mapState, mapDispatch)(Portfolio);
