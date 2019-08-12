import React, { Component } from "react";
import PropTypes from "prop-types";
import DataLoad from "../../DataLoad.js"

class Board extends Component {
  constructor({ state, handleChange }) {
    super();
    this.state = state;
    this.handleChange = handleChange;

    if (!state.players) {
      this.handleChange({ type: 'SET_PLAYERS', players: this.initPlayers() });
    }
  }

  initPlayers() {
    let players = DataLoad.projections();
    let rankings = DataLoad.ranks();

    rankings.forEach(player => {
      var pl = players[player.pos].find(p => p.name == player.name);
      if (pl) {
        Object.assign(pl, player);
      }
    });

    var aveQB = players.qb[11].ppg;
    var aveRB = players.rb[40].ppg;
    var aveWR = players.wr[44].ppg;
    var aveTE = players.te[8].ppg;
    var aveK = players.k[1].ppg;
    var aveDST = players.dst[2].ppg;

    function pad(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    }

    var insertPointDif = function (players, baseline) {
      players.forEach(function (player) {
        player.pointDif = player.ppg - baseline;
      });
      players.sort(function (a, b) {
        return b.pointDif - a.pointDif;
      });
      players.forEach(function (player, i) {
        player.posrank = pad(i + 1, 2);
      });
    };

    insertPointDif(players.qb, aveQB);
    insertPointDif(players.rb, aveRB);
    insertPointDif(players.wr, aveWR);
    insertPointDif(players.te, aveTE);
    insertPointDif(players.k, aveK);
    insertPointDif(players.dst, aveDST);

    let allPlayers = players.qb.concat(players.rb).concat(players.wr).concat(players.te).concat(players.k).concat(players.dst);

    allPlayers.sort(function (a, b) {
      return b.pointDif - a.pointDif;
    });

    allPlayers.forEach(function (player, i) {
      player.vrank = i + 1;
      player.rank = i + 1;
      player.displayPosition = player.position + player.posrank;
    });

    return allPlayers;
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
