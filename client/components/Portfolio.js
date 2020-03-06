import React, { Component } from "react";
import { connect } from "react-redux";
import { hashStock } from "../utils/utilities";
import { getPortfolio, getLiveStock, setError } from "../store";

import Stock from "./Stock";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      update: false
    };
  }

  componentDidMount() {
    const { getPortfolio, user, portfolio, getLiveStock } = this.props;
    if (user.id) getPortfolio(user.id);
    if (portfolio.length) {
      getLiveStock(hashStock(portfolio));
      this.stockTimer();
    }
  }

  componentWillUnmount() {
    this.setState({ update: false });
    clearInterval(this.stockInterval);
  }

  componentDidUpdate(prevProps) {
    const { getPortfolio, user, portfolio, getLiveStock, error } = this.props;
    if (user.id && user.id !== prevProps.user.id) getPortfolio(user.id);
    if (portfolio.length && !this.state.update && !error) {
      getLiveStock(hashStock(portfolio));
      this.stockTimer();
    }
  }

  stockTimer = () => {
    this.setState({ update: 1 });
    this.stockInterval = setInterval(this.stockUpdate, 2000);
  };

  stockUpdate = () => {
    const { portfolio, getLiveStock, setError } = this.props,
      { update } = this.state;

    if (update >= 5) {
      clearInterval(this.stockInterval);
      setError("Are you still here?");
      this.setState({ update: false });
    } else {
      this.setState({ update: update + 1 });
      getLiveStock(hashStock(portfolio));
    }
  };

  updateTimer = () => {
    this.setState({ update: false });
  };

  postList = port => {
    const hash = hashStock(port),
      { stocks } = this.props;
    let totalVal = 0;

    if (Object.keys(stocks).length) {
      Object.keys(hash).forEach(key => {
        // ADDING IN STOCK VALUE AND OPENING!
        if (!(key in stocks)) {
          stocks[key] = {};
          stocks[key].latestPrice = 0;
          stocks[key].openingPrice = 0;
        }
        hash[key].curPrice = stocks[key].latestPrice;
        hash[key].openPrice = stocks[key].openingPrice;

        // ACCUMULATING TOTAL PORTFOLIO VALUE
        totalVal += hash[key].curPrice * hash[key].quantity;
      });
    }

    return [totalVal, Object.values(hash)];
  };

  render() {
    const { portfolio, user } = this.props,
      [totalVal, adjPortfolio] = this.postList(portfolio);

    return (
      <div className="portFullDiv">
        <div className="allStockDiv">
          <h4 className="portValueHeader">
            {String.fromCharCode(9733)}&nbsp;&nbsp;&nbsp;
            {user.name ? `${user.name.split(" ")[0]}'s` : "Loading"} Portfolio:
            $
            <span className="moneyBalance">
              {totalVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            &nbsp;&nbsp;&nbsp;
            {String.fromCharCode(9733)}
          </h4>

          <div className="portStockDiv">
            {portfolio.length ? (
              adjPortfolio.map((stock, idx) => (
                <Stock key={idx} stock={stock} />
              ))
            ) : (
              <span className="portNoStock">Buy Some Stocks!</span>
            )}
          </div>
        </div>

        <div className="portActionDiv">
          <h4 className="cashHeader">
            Cash Balance: $
            <span className="moneyBalance">
              {user.cash
                ? user.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}
            </span>
          </h4>

          <div className="portFormFullDiv">
            <BuyForm update={this.updateTimer} />

            <SellForm update={this.updateTimer} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    portfolio: state.portfolio,
    stocks: state.stocks,
    error: state.error
  };
};

const mapDispatch = dispatch => {
  return {
    getPortfolio: userId => dispatch(getPortfolio(userId)),
    getLiveStock: portfolio => dispatch(getLiveStock(portfolio)),
    setError: msg => dispatch(setError(msg))
  };
};

export default connect(mapState, mapDispatch)(Portfolio);
