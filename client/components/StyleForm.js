import React, { Component } from "react";
import { connect } from "react-redux";
import { setStyle } from "../store";

class StyleForm extends Component {
  constructor() {
    super();
    this.state = {
      style: "Last Closing"
    };
  }

  handleChange = evt => {
    this.setState({ style: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { style, setStyle, update } = this.props;

    if (style !== this.state.style) {
      setStyle(this.state.style);
      update();
    }
  };

  render() {
    const { style } = this.props;

    return (
      <div className="styleFormFullDiv">
        <h4 className="styleFormheader">Update Style</h4>

        <div className="styleFormInsideDiv">
          <span className="styleFormSpan1">Choose From Two Options</span>

          <span className="styleFormSpan2">
            1. <u className="styleTextClosing">Last Closing</u>: Update once a
            day, leveraging the stock's last closing price
          </span>

          <span className="styleFormSpan2">
            2. <u className="styleTextPrice">Last Price</u>: Update every 3
            seconds, leveraging the stock's latest price
          </span>

          <span className="styleFormSpan3">
            Current Style:{" "}
            <strong className={`styleText${style.split(" ")[1]}`}>
              {style}
            </strong>
          </span>

          <div className="styleFormActionsDiv">
            <select
              className="styleFormSelect"
              value={this.state.style}
              onChange={this.handleChange}
            >
              <option className="styleFormOpt">Last Closing</option>
              <option className="styleFormOpt">Last Price</option>
            </select>

            <button
              className="styleFormBtn"
              type="button"
              onClick={this.handleSubmit}
            >
              Update Style
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return { style: state.style };
};

const mapDispatch = dispatch => {
  return { setStyle: style => dispatch(setStyle(style)) };
};

export default connect(mapState, mapDispatch)(StyleForm);
