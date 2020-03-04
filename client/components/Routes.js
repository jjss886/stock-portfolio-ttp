import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import { Login, Signup } from "./AuthForm";
import Portfolio from "./Portfolio";
import Transaction from "./Transaction";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/SignIn"
          render={() => (
            <div className="signInFullDiv">
              <Login />
              <Signup />
            </div>
          )}
        />
        <Route path="/Portfolio" component={Portfolio} />
        <Route path="/Transaction" component={Transaction} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
