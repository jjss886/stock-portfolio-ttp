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

  portValue = arr => arr.reduce((acm, val) => acm + val.quantity * val.cost, 0);

  postList = port => {
    const hash = port.reduce((acm, val) => {
      const { ticker, quantity } = val;
      ticker in acm ? (acm[ticker].quantity += quantity) : (acm[ticker] = val);
      return acm;
    }, {});

    // NEED TO ADD IN STOCK VALUE!

    return Object.values(hash);
  };

  render() {
    const { portfolio, user } = this.props;

    return (
      <div className="portFullDiv">
        {portfolio.length ? (
          <div className="allStockDiv">
            <h4 className="portValueHeader">
              Portfolio Value: $
              {this.portValue(portfolio)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h4>

            {this.postList(portfolio).map((stock, idx) => (
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
