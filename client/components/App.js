import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { me } from "../store";

import Routes from "./Routes";
import NavBar from "./NavBar";
import ErrorMsg from "./ErrorMsg";

class App extends Component {
  componentDidMount() {
    this.props.me();
  }

  render() {
    return (
      <div className="appFullDiv">
        <ErrorMsg />

        <NavBar />

        <div className="appInsideDiv">
          <Routes />
        </div>

        <span className="sigText">By James Shen</span>
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
    me: () => dispatch(me())
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));
