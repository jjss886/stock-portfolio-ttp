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

  render() {
    const { portfolio, user } = this.props;

    return (
      <div className="portFullDiv">
        {portfolio.length ? (
          <div className="allStockDiv">
            <h4>
              Portfolio Value:{" "}
              {portfolio.reduce((acm, val) => acm + val.quantity * val.cost, 0)}
            </h4>

            {portfolio.map((stock, idx) => (
              <Stock key={idx} stock={stock} />
            ))}
          </div>
        ) : (
          <h3>Loading</h3>
        )}

        <div className="portFormFullDiv">
          <h4 className="cashHeader">
            Cash - $
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
