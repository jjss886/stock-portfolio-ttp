import React, { Component } from "react";
import { connect } from "react-redux";
import { hashStock, dateCreate } from "../utils/utilities";
import { transactStock, setError } from "../store";

class SellForm extends Component {
  constructor() {
    super();
    this.state = {
      ticker: "--",
      quantity: ""
    };
  }

  handleTickerChange = evt => {
    this.setState({ ticker: evt.target.value });
  };

  handleChange = evt => {
    const { name, value } = evt.target,
      { setError } = this.props;
    if (isNaN(value)) return setError("Only include numbers");

    this.setState({
      [name]: Number(value)
    });
  };

  sell = evt => {
    evt.preventDefault();
    const { ticker, quantity } = this.state,
      { user, transactStock, portfolio, setError } = this.props,
      hash = hashStock(portfolio);
    if (ticker === "--" || !quantity)
      return setError("Please fill out the whole form!");

    // !! STILL NEED TO COMPLETE SELLING FUNCTION!
    let res = true;
    // const res = await stockPull(this.state.ticker);
    if (res) {
      // const { companyName, lastestPrice } = res,
      const companyName = "apple",
        lastestPrice = 290;

      if (quantity > hash[ticker].quantity) setError("Selling too many");
      else {
        transactStock({
          userId: user.id,
          ticker,
          name: companyName,
          quantity,
          value: lastestPrice,
          action: "sell",
          date: dateCreate()
        });
      }
    } else setError("Not a valid ticker");

    this.setState({ ticker: "--", quantity: "" });
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
            <option className="sellTickerOption">--</option>
            {portfolio.length
              ? Object.keys(hashStock(portfolio)).map((ticker, idx) => (
                  <option key={idx} className="sellTickerOption">
                    {ticker}
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
    user: state.user,
    portfolio: state.portfolio
  };
};

const mapDispatch = dispatch => {
  return {
    transactStock: stockObj => dispatch(transactStock(stockObj)),
    setError: msg => dispatch(setError(msg))
  };
};

export default connect(mapState, mapDispatch)(SellForm);
