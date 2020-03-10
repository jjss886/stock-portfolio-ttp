import React, { Component } from "react";
import { connect } from "react-redux";
import { hashStock, refreshTime, updateCap } from "../../utils/utilities";
import { getPortfolio, getLiveStock, setError } from "../../store";

import StyleForm from "./StyleForm";
import Stock from "./Stock";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      update: 0 // TRIGGER TO STOP PREMIUM UPDATES IF USER IS IDLE
    };
  }

  componentDidMount() {
    const { getPortfolio, user, portfolio, getLiveStock, style } = this.props;

    // SET PORTFOLIO ONTO STATE
    if (user.id) getPortfolio(user.id);

    if (portfolio.length) {
      // SET STOCK VALUES ONTO STATE, BEGIN UPDATE COUNT
      this.setState({ update: 1 });
      getLiveStock(hashStock(portfolio));
      if (style === "Premium") this.stockTimer();
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

    // CHECK WHEN NEED NEW PORTFOLIO STATE
    if (user.id && user.id !== prevProps.user.id) getPortfolio(user.id);

    // CHECK WHEN NEED NEW STOCK STATE
    if (
      portfolio.length &&
      (!this.state.update ||
        style !== prevProps.style ||
        portfolio.length !== prevProps.portfolio.length) &&
      !error
    ) {
      this.setState({ update: 1 });
      getLiveStock(hashStock(portfolio));
      // CHECK IF A NEW INTERVAL NEEDS TO BE SET FOR PREMIUM STYLE
      if (
        style === "Premium" &&
        (error !== prevProps.error || prevProps.style !== "Premium")
      ) {
        this.stockTimer();
      }
    }
  }

  stockTimer = () => {
    // PREMIUM STYLE ENABLING CONSTANT PRICE UPDATES BASED ON SET REFRESH TIME
    this.stockInterval = setInterval(this.stockUpdate, refreshTime);
  };

  stockUpdate = () => {
    const { portfolio, getLiveStock, setError } = this.props,
      { update } = this.state;

    if (update >= updateCap) {
      // USER HAS BEEN IDLE LONG ENOUGH SO SHOW ALERT AND RESET
      clearInterval(this.stockInterval);
      setError("Are you still here?");
      this.setState({ update: 0 });
    } else {
      this.setState({ update: update + 1 });
      getLiveStock(hashStock(portfolio));
    }
  };

  updateTimerToOne = () => {
    // FUNCTION FOR OTHER COMPONENTS TO RESET IDLE STATE
    this.setState({ update: 1 });
  };

  clearStockInterval = () => {
    // ENSURE API HITS DON'T HIT WHILE ON OTHER COMPONENTS
    this.setState({ update: 0 });
    clearInterval(this.stockInterval);
  };

  postList = port => {
    // CREATING UNIQUE STOCK PORTFOLIO AND CALC TOTAL VALUE
    const hash = hashStock(port),
      { stocks } = this.props;
    let totalVal = 0;

    if (Object.keys(stocks).length) {
      Object.keys(hash).forEach(key => {
        // SAFE GUARD TEST CASE IF STOCKS AREN'T AVAILABLE YET
        if (!(key in stocks)) {
          stocks[key] = {};
          stocks[key].latestPrice = 0;
          stocks[key].openingPrice = 0;
        }

        // ADDING IN STOCK VALUE AND OPENING
        hash[key].curPrice = stocks[key].latestPrice;
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
            <BuyForm updateTimer={this.updateTimerToOne} />

            <SellForm updateTimer={this.updateTimerToOne} />
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
