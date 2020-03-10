import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store";

class NavBar extends Component {
  loggingOut = () => {
    this.props.logout();
  };

  render() {
    const userId = this.props.user.id;

    return (
      <div className="navBarFullDiv">
        <div className="navBarLeft">
          <h2 className="navBarHeader">Stock Portfolio TTP</h2>
        </div>

        <div className="navBarRight">
          <NavLink
            to="/"
            className="linkText navBarLink"
            activeClassName="selectedNavLink"
            exact
          >
            Home Page
          </NavLink>

          {userId ? (
            <>
              <NavLink
                to="/Portfolio"
                className="linkText navBarLink"
                activeClassName="selectedNavLink"
                exact
              >
                Portfolio
              </NavLink>

              <NavLink
                to="/Transaction"
                className="linkText navBarLink"
                activeClassName="selectedNavLink"
                exact
              >
                Transaction
              </NavLink>

              <a
                href="#"
                onClick={this.loggingOut}
                className="linkText navBarLink"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <NavLink
                to="/LogIn"
                className="linkText navBarLink"
                activeClassName="selectedNavLink"
                exact
              >
                Log In
              </NavLink>

              <NavLink
                to="/SignUp"
                className="linkText navBarLink"
                activeClassName="selectedNavLink"
                exact
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
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
