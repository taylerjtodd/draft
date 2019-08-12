import React, { Component } from "react";
import PropTypes from "prop-types";
import DataLoad from "../../DataLoad.js"

class Board extends Component {
  constructor({ state, handleChange }) {
    super();
    this.state = state;
    this.handleChange = handleChange;

    if (!state.players) {
      this.handleChange({type: 'SET_PLAYERS', players: this.initPlayers()});
    }
  }

  initPlayers() {
    let players = DataLoad.projections();
    let rankings = DataLoad.ranks();

    rankings.forEach(player => {
        var pl = players[player.pos].find(p => p.name == player.name);
        if(pl) {
          Object.assign(pl, player);
        }
    });
    return players;
  }

  render() {
    const { currentTab } = this.state;
    return (
      <input
        type='text'
        className="form-control"
        value='Board'
        onChange={() => this.handleChange({ type: 'BOARD_CHANGE' })}
      />
    );
  }
}

export default Board;
