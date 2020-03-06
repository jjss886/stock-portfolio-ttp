import React, { Component } from "react";
import { connect } from "react-redux";

class StyleForm extends Component {
  render() {
    return (
      <div className="styleFormFullDiv">
        <h4 className="styleFormheader">Update Style</h4>

        <div className="styleFormInsideDiv">
          <span className="styleFormSpan1">Choose From Two Options</span>

          <span className="styleFormSpan2">
            1. <u>Last Closing</u>: Update once a day, leveraging the stock's
            last closing price
          </span>

          <span className="styleFormSpan2">
            2. <u>Live Update</u>: Update every 3 seconds, leveraging the
            stock's latest price
          </span>

          <select className="styleFormSelect">
            <option className="styleFormOpt">Last Closing</option>
            <option className="styleFormOpt">Last Price</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(StyleForm);
