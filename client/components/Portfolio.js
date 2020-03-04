import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio } from "../store";

import Stock from "./Stock";
import BuyForm from "./BuyForm";

class Portfolio extends Component {
  componentDidUpdate(prevProps) {
    const { getPortfolio, user } = this.props;
    if (user.id !== prevProps.user.id) getPortfolio(user.id);
  }

  render() {
    return (
      <div className="portFullDiv">
        Portfolio
        <Stock />
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
