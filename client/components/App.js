import React, { Component } from "react";

import Routes from "./Routes";
import NavBar from "./NavBar";

class App extends Component {
  render() {
    return (
      <div className="appFullDiv">
        <NavBar />

        <div className="appInsideDiv">
          <h2>App</h2>

          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
