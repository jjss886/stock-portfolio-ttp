import React, { Component } from "react";
import { connect } from "react-redux";
import { stockPull } from "../utils/utilities";

class BuyForm extends Component {
  constructor() {
    super();
    this.state = {
      ticker: "",
      quantity: ""
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  buy = async evt => {
    evt.preventDefault();
    const res = await stockPull(this.state.ticker);
    // BUY STOCK AND REDUCE CASH
    this.setState({ ticker: "", quantity: "" });
  };

  render() {
    const { user } = this.props;

    return (
      <div className="buyFormFullDiv">
        <h4>
          Cash - $
          {user.cash
            ? user.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : 0}
        </h4>

        <form className="buyForm" onSubmit={this.buy}>
          <div className="formSectionDiv">
            <label className="buyLabels" htmlFor="ticker">
              Ticker:{" "}
            </label>
            <input
              className="buyInputs"
              type="text"
              name="ticker"
              value={this.state.ticker}
              onChange={this.handleChange}
              placeholder="Ticker"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Ticker")}
            />
          </div>

          <div className="formSectionDiv">
            <label className="buyLabels" htmlFor="quantity">
              Quantity:{" "}
            </label>
            <input
              className="buyInputs"
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
              placeholder="Quantity"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Quantity")}
            />
          </div>

          <button className="buyBtn" type="submit">
            Buy
          </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(BuyForm);
