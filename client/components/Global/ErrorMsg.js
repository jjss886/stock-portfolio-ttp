import React, { Component } from "react";
import { connect } from "react-redux";
import { setError } from "../../store";

class ErrorMsg extends Component {
  render() {
    const { error, errorMsg, setError } = this.props;

    return error ? (
      <div className="errMsgFullDiv">
        <div className="errInsideDiv">
          <h3 className="errHeader">Heads Up!</h3>

          <span className="errText">{errorMsg}</span>

          <button className="errBtn" onClick={setError}>
            Close
          </button>
        </div>
      </div>
    ) : null;
  }
}

const mapState = state => {
  return { error: state.error, errorMsg: state.errorMsg };
};

const mapDispatch = dispatch => {
  return { setError: () => dispatch(setError()) };
};

export default connect(mapState, mapDispatch)(ErrorMsg);
