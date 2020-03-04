import React, { Component } from "react";
import { connect } from "react-redux";
import { hashStock, dateCreate } from "../utils/utilities";
import { transactStock } from "../store";

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
    const { name, value } = evt.target;
    if (isNaN(value)) return alert("Numbers!");

    this.setState({
      [name]: Number(value)
    });
  };

  sell = evt => {
    evt.preventDefault();
    const { ticker, quantity } = this.state,
      { user, transactStock } = this.props;
    if (!ticker || !quantity) return alert("Fill Out Form!");

    // !! STILL NEED TO COMPLETE SELLING FUNCTION!
    let res = true;
    // const res = await stockPull(this.state.ticker);
    if (res) {
      // const { companyName, lastestPrice } = res,
      const companyName = "apple",
        lastestPrice = 290,
        totalCost = lastestPrice * quantity;
      if (totalCost > user.cash) return alert("Not Enough Cash");
      transactStock({
        userId: user.id,
        ticker,
        name: companyName,
        quantity,
        value: lastestPrice,
        action: "sell",
        date: dateCreate()
      });
    } else alert("No Ticker");

    this.setState({ ticker: "", quantity: "" });
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
    transactStock: stockObj => dispatch(transactStock(stockObj))
  };
};

export default connect(mapState, mapDispatch)(SellForm);
