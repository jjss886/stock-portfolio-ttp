import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store";

class NavBar extends Component {
  loggingOut = () => {
    this.props.logout();
  };

  render() {
    const userId = this.props.user.id;
    console.log("nav -", userId);

    return (
      <div className="navBarFullDiv">
        <div className="navBarLeft">
          <h2 className="navBarHeader">Stock Portfolio TTP</h2>
        </div>

        {userId ? (
          <div className="navBarRight">
            <NavLink
              to="/Portfolio"
              className="linkText navBarLink"
              activeClassName="selectedNavLink"
              exact
            >
              Portfolio
            </NavLink>

            <NavLink
              to="/Transction"
              className="linkText navBarLink"
              activeClassName="selectedNavLink"
              exact
            >
              Transction
            </NavLink>

            <a
              href="#"
              onClick={this.loggingOut}
              className="linkText navBarLink"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="navBarRight">
            <NavLink
              to="/SignIn"
              className="linkText navBarLink"
              activeClassName="selectedNavLink"
              exact
            >
              Sign In
            </NavLink>
          </div>
        )}
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
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(NavBar);
