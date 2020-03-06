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
    const { setError, updateTimer } = this.props;
    let { name, value } = evt.target;

    // STILL ACTIVE SO RESET STALL TIMER FOR PARENT COMPONENT
    updateTimer();

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
      { user, transactStock, setError, updateTimer, style } = this.props;

    // STILL ACTIVE SO RESET STALL TIMER FOR PARENT COMPONENT
    updateTimer();

    if (!ticker || !quantity)
      return setError("Please fill out the whole form!");

    // const res = true;
    const res = await stockPull(this.state.ticker);
    if (res) {
      // const companyName = "apple",
      //   previousClose = 125,
      //   lastestPrice = 100;
      const { companyName, lastestPrice, previousClose } = res;
      const subjectPrice =
          style === "Last Closing" ? previousClose : lastestPrice,
        totalCost = subjectPrice * quantity;

      if (totalCost > user.cash) return setError("Not Enough Cash");

      transactStock({
        userId: user.id,
        ticker,
        name: companyName,
        quantity,
        value: subjectPrice,
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
    user: state.user,
    style: state.style
  };
};

const mapDispatch = dispatch => {
  return {
    transactStock: stockObj => dispatch(transactStock(stockObj)),
    setError: msg => dispatch(setError(msg))
  };
};

export default connect(mapState, mapDispatch)(BuyForm);
