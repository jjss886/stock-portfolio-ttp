import React, { Component } from "react";
import { connect } from "react-redux";
import { setStyle, setError } from "../store";
import { dateCreate } from "../utils/utilities";

class StyleForm extends Component {
  constructor() {
    super();
    this.state = {
      style: "Regular"
    };
  }

  handleChange = evt => {
    this.setState({ style: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { style, setStyle, update, setError } = this.props,
      date = dateCreate(),
      day = date.slice(0, 3),
      time = Number(date.slice(16, 18)) * 60 + Number(date.slice(19, 21));

    // STILL ACTIVE SO RESET STALL TIMER FOR PARENT COMPONENT
    update();

    if (style !== this.state.style) {
      if (
        this.state.style === "Premium" &&
        (day === "Sat" || day === "Sun" || time < 570 || time > 960)
      ) {
        return setError("Premium unavailable outside market hours");
      } else setStyle(this.state.style);
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
            1. <u className="styleTextRegular">Regular</u>: Update once per
            session
          </span>

          <span className="styleFormSpan2">
            2. <u className="styleTextPremium">Premium</u>: Update every 5
            seconds
          </span>

          <span className="styleFormSpan3">
            Current Style:{" "}
            <strong className={`styleText${style}`}>{style}</strong>
          </span>

          <div className="styleFormActionsDiv">
            <select
              className="styleFormSelect"
              value={this.state.style}
              onChange={this.handleChange}
            >
              <option className="styleFormOpt">Regular</option>
              <option className="styleFormOpt">Premium</option>
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
  return {
    setStyle: style => dispatch(setStyle(style)),
    setError: msg => dispatch(setError(msg))
  };
};

export default connect(mapState, mapDispatch)(StyleForm);
