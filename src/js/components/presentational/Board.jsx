import React, { Component } from "react";
import PropTypes from "prop-types";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: window.location.hash
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event)
  }

  render() {
    const { currentTab } = this.state;
    return (
      <input
        type='text'
        className="form-control"
        value='Board'
      />
    );
  }
}

export default Board;
