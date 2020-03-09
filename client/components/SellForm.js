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
    const { style, updateTimer } = this.props;
    // STILL ACTIVE SO RESET STALL TIMER FOR PARENT COMPONENT
    if (style === "Last Price") updateTimer();

    this.setState({ ticker: evt.target.value });
  };

  handleChange = evt => {
    const { name, value } = evt.target,
      { setError, updateTimer, style } = this.props;

    // STILL ACTIVE SO RESET STALL TIMER FOR PARENT COMPONENT
    if (style === "Last Price") updateTimer();

    if (isNaN(value)) return setError("Only include numbers");

    this.setState({
      [name]: Number(value)
    });
  };

  sell = evt => {
    evt.preventDefault();
    const { ticker, quantity } = this.state,
      {
        user,
        transactStock,
        portfolio,
        setError,
        style,
        stocks,
        updateTimer
      } = this.props,
      hash = hashStock(portfolio);

    // STILL ACTIVE SO RESET STALL TIMER FOR PARENT COMPONENT
    if (style === "Last Price") updateTimer();

    if (ticker === "--" || !quantity)
      return setError("Please fill out the whole form!");

    const { companyName, latestPrice, previousClose } = stocks[ticker],
      subjectPrice = style === "Last Closing" ? previousClose : latestPrice;

    if (quantity > hash[ticker].quantity) return setError("Selling too many");

    transactStock({
      userId: user.id,
      ticker,
      name: companyName,
      quantity,
      value: subjectPrice,
      action: "sell",
      date: dateCreate()
    });

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
    portfolio: state.portfolio,
    stocks: state.stocks,
    style: state.style
  };
};

const mapDispatch = dispatch => {
  return {
    transactStock: stockObj => dispatch(transactStock(stockObj)),
    setError: msg => dispatch(setError(msg))
  };
};

export default connect(mapState, mapDispatch)(SellForm);
