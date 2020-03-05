import React, { Component } from "react";
import { connect } from "react-redux";
import { hashStock } from "../utils/utilities";
import { getPortfolio, getLiveStock } from "../store";
import SingleTransact from "./SingleTransact";

class Transaction extends Component {
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

  splitBuySell = portfolio => {
    const buy = [],
      sell = [];

    portfolio.forEach(port => {
      if (port.action === "buy") buy.push(port);
      else sell.push(port);
    });

    return [buy, sell];
  };

  render() {
    const { portfolio } = this.props,
      [buy, sell] = this.splitBuySell(portfolio);

    return (
      <div className="transactFullDiv">
        {portfolio.length ? (
          <div className="buyTransactDiv transactDiv">
            <h3 className="transactHeader">Buy</h3>
            {buy
              .slice()
              .reverse()
              .map((stock, idx) => (
                <SingleTransact key={idx} stock={stock} />
              ))}
          </div>
        ) : null}

        {portfolio.length ? (
          <div className="sellTransactDiv transactDiv">
            <h3 className="transactHeader">Sell</h3>
            {sell
              .slice()
              .reverse()
              .map((stock, idx) => (
                <SingleTransact key={idx} stock={stock} />
              ))}
          </div>
        ) : null}
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
    getPortfolio: userId => dispatch(getPortfolio(userId)),
    getLiveStock: portfolio => dispatch(getLiveStock(portfolio))
  };
};

export default connect(mapState, mapDispatch)(Transaction);
