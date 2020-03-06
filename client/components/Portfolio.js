import React, { Component } from "react";
import { connect } from "react-redux";
import { hashStock, refreshTime, updateCap } from "../utils/utilities";
import { getPortfolio, getLiveStock, setError } from "../store";

import StyleForm from "./StyleForm";
import Stock from "./Stock";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      update: 0
    };
  }

  componentDidMount() {
    const { getPortfolio, user, portfolio, getLiveStock, style } = this.props;

    // SET PORTFOLIO ONTO STATE
    if (user.id) getPortfolio(user.id);

    // SET STOCK VALUES ONTO STATE
    if (portfolio.length) {
      this.setState({ update: 1 });
      getLiveStock(hashStock(portfolio));
      if (style === "Last Price") this.stockTimer();
    }
  }

  componentWillUnmount() {
    this.clearStockInterval();
  }

  componentDidUpdate(prevProps) {
    const {
      getPortfolio,
      user,
      portfolio,
      getLiveStock,
      error,
      style
    } = this.props;

    if (user.id && user.id !== prevProps.user.id) getPortfolio(user.id);
    if (
      portfolio.length &&
      (!this.state.update || style !== prevProps.style) &&
      !error
    ) {
      this.setState({ update: 1 });
      getLiveStock(hashStock(portfolio));
      if (style === "Last Price") this.stockTimer();
    }
  }

  stockTimer = () => {
    this.stockInterval = setInterval(this.stockUpdate, refreshTime);
  };

  stockUpdate = () => {
    const { portfolio, getLiveStock, setError } = this.props,
      { update } = this.state;

    if (update >= updateCap) {
      clearInterval(this.stockInterval);
      setError("Are you still here?");
      this.setState({ update: 0 });
    } else {
      this.setState({ update: update + 1 });
      getLiveStock(hashStock(portfolio));
    }
  };

  updateTimerToZero = () => {
    this.setState({ update: 1 });
  };

  clearStockInterval = () => {
    this.setState({ update: 0 });
    clearInterval(this.stockInterval);
  };

  postList = port => {
    const hash = hashStock(port),
      { stocks, style } = this.props;
    let totalVal = 0;

    if (Object.keys(stocks).length) {
      Object.keys(hash).forEach(key => {
        // ADDING IN STOCK VALUE AND OPENING!
        if (!(key in stocks)) {
          stocks[key] = {};
          stocks[key].latestPrice = 0;
          stocks[key].openingPrice = 0;
          stocks[key].previousClose = 0;
        }

        hash[key].curPrice =
          style === "Last Price"
            ? stocks[key].latestPrice
            : stocks[key].previousClose;
        hash[key].openPrice = stocks[key].openingPrice;

        // ACCUMULATING TOTAL PORTFOLIO VALUE
        totalVal += hash[key].curPrice * hash[key].quantity;
      });
    }

    return [Math.round(totalVal), Object.values(hash)];
  };

  render() {
    const { portfolio, user } = this.props,
      [totalVal, adjPortfolio] = this.postList(portfolio);

    return (
      <div className="portFullDiv">
        <StyleForm update={this.clearStockInterval} />

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
                ? Math.round(user.cash)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0}
            </span>
          </h4>

          <div className="portFormFullDiv">
            <BuyForm updateTimer={this.updateTimerToZero} />

            <SellForm updateTimer={this.updateTimerToZero} />
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
    error: state.error,
    style: state.style
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
