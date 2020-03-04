import React, { Component } from "react";
import { connect } from "react-redux";

class SellForm extends Component {
  constructor() {
    super();
    this.state = {
      ticker: "",
      quantity: ""
    };
  }

  handleTickerChange = evt => {
    this.setState({ ticker: evt.target.value });
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    if (isNaN(value)) return alert("Numbers!");

    this.setState({
      [name]: Number(value)
    });
  };

  sell = evt => {
    evt.preventDefault();
    const { ticker, quantity } = this.state;
  };

  render() {
    const { portfolio } = this.props;
    return (
      <div className="sellFormFullDiv formFullDiv">
        <h3 className="formHeader">Cash Out</h3>

        <div className="formSectionDiv">
          <label className="sellLabels formLabel" htmlFor="quantity">
            Ticker:{" "}
          </label>
          <select
            className="sellFormSelect"
            value={this.state.ticker}
            onChange={this.handleTickerChange}
          >
            {portfolio.length
              ? portfolio.map((stock, idx) => (
                  <option key={idx} className="sellTickerOption">
                    {stock.ticker}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className="formSectionDiv">
          <label className="sellLabels formLabel" htmlFor="quantity">
            Quantity:{" "}
          </label>
          <input
            className="sellInputs formInput"
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
            placeholder="Quantity"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "Quantity")}
          />
        </div>

        <button className="sellBtn formBtn" type="button" onClick={this.sell}>
          Sell
        </button>
      </div>
    );
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
