import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio } from "../store";

import Stock from "./Stock";
import BuyForm from "./BuyForm";

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
    const { portfolio } = this.props;
    return (
      <div className="portFullDiv">
        {portfolio.length ? (
          <div className="allStockDiv">
            {portfolio.map((stock, idx) => (
              <Stock key={idx} stock={stock} />
            ))}
          </div>
        ) : null}

        <BuyForm />
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
