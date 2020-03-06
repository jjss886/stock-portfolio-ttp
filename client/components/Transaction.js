import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio } from "../store";
import TransactSum from "./TransactSum";
import SingleTransact from "./SingleTransact";

class Transaction extends Component {
  componentDidMount() {
    const { getPortfolio, user } = this.props;
    if (user.id) getPortfolio(user.id);
  }

  componentDidUpdate(prevProps) {
    const { getPortfolio, user } = this.props;
    if (user.id && user.id !== prevProps.user.id) getPortfolio(user.id);
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
        <TransactSum port={portfolio} />

        <div className="transBuySellDiv">
          {portfolio.length ? (
            <div className="transactOuterDiv">
              <h3 className="transactHeader">Buy History</h3>

              <div className="buyTransactDiv transactDiv">
                {buy
                  .slice()
                  .reverse()
                  .map((stock, idx) => (
                    <SingleTransact key={idx} idx={idx} stock={stock} />
                  ))}
              </div>
            </div>
          ) : null}

          {portfolio.length ? (
            <div className="transactOuterDiv">
              <h3 className="transactHeader">Sell History</h3>

              <div className="sellTransactDiv transactDiv">
                {sell
                  .slice()
                  .reverse()
                  .map((stock, idx) => (
                    <SingleTransact key={idx} idx={idx} stock={stock} />
                  ))}
              </div>
            </div>
          ) : null}
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

export default connect(mapState, mapDispatch)(Transaction);
