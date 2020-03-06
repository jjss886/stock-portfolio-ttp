import React, { Component } from "react";
import { connect } from "react-redux";
import { stockPull, dateCreate } from "../utils/utilities";
import { transactStock, setError } from "../store";

class BuyForm extends Component {
  constructor() {
    super();
    this.state = {
      ticker: "",
      quantity: ""
    };
  }

  handleChange = evt => {
    const { setError } = this.props;
    let { name, value } = evt.target;
    if (name === "quantity") {
      if (isNaN(value)) return setError("Only include numbers");
      else value = Number(value);
    }

    this.setState({
      [name]: value
    });
  };

  buy = async evt => {
    evt.preventDefault();
    const { ticker, quantity } = this.state,
      { user, transactStock, setError } = this.props;
    if (!ticker || !quantity)
      return setError("Please fill out the whole form!");

    let res = true;
    // const res = await stockPull(this.state.ticker);
    if (res) {
      // const { companyName, lastestPrice } = res,
      const companyName = "apple",
        lastestPrice = 120,
        totalCost = lastestPrice * quantity;
      if (totalCost > user.cash) return setError("Not Enough Cash");
      transactStock({
        userId: user.id,
        ticker,
        name: companyName,
        quantity,
        value: lastestPrice,
        action: "buy",
        date: dateCreate()
      });
    } else setError("Not a valid ticker");

    this.setState({ ticker: "", quantity: "" });
  };

  render() {
    return (
      <div className="buyFormFullDiv formFullDiv">
        <h3 className="formHeader">Let's Invest</h3>

        <div className="formSectionDiv">
          <label className="buyLabels formLabel" htmlFor="ticker">
            Ticker:{" "}
          </label>
          <input
            className="buyInputs formInput"
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
          <label className="buyLabels formLabel" htmlFor="quantity">
            Quantity:{" "}
          </label>
          <input
            className="buyInputs formInput"
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
            placeholder="Quantity"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "Quantity")}
          />
        </div>

        <button className="buyBtn formBtn" type="submit" onClick={this.buy}>
          Buy
        </button>
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
  return {
    transactStock: stockObj => dispatch(transactStock(stockObj)),
    setError: msg => dispatch(setError(msg))
  };
};

export default connect(mapState, mapDispatch)(BuyForm);
