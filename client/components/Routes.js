import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { me } from "../store";

import { Login, Signup } from "./AuthForm";
import Portfolio from "./Portfolio";
import Transaction from "./Transaction";
import HomePage from "./HomePage";

class Routes extends Component {
  componentDidMount() {
    this.props.me();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/LogIn" component={Login} />
        <Route exact path="/SignUp" component={Signup} />
        <Route exact path="/Portfolio" component={Portfolio} />
        <Route exact path="/Transaction" component={Transaction} />
      </Switch>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me())
  };
};

export default withRouter(connect(null, mapDispatch)(Routes));
