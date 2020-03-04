import React, { Component } from "react";
import { connect } from "react-redux";
import { getPortfolio } from "../store";
import SingleTransact from "./SingleTransact";

class Transaction extends Component {
  componentDidUpdate(prevProps) {
    const { getPortfolio, user } = this.props;
    if (user.id !== prevProps.user.id) getPortfolio(user.id);
  }

  render() {
    const { portfolio } = this.props;

    return (
      <div className="transactFullDiv">
        Transaction
        {portfolio.length
          ? portfolio.map((stock, idx) => (
              <SingleTransact key={idx} stock={stock} />
            ))
          : null}
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
