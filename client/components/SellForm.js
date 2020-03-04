import React, { Component } from "react";
import { connect } from "react-redux";

class SellForm extends Component {
  render() {
    return <div className="sellFormFullDiv"></div>;
  }
}

const mapState = state => {
  return {
    portfolio: state.portfolio
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(SellForm);
