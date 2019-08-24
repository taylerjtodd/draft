import React, { Component } from "react";
import DataLoad from "../../DataLoad.js"
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';

class Board extends Component {
  constructor({ state, handleChange, draftPlayer }) {
    super();
    this.state = state;
    this.handleChange = handleChange;
    this.draftPlayer = draftPlayer;

    if (!state.players) {
      const players = this.initPlayers();
      this.handleChange({ type: 'SET_PLAYERS', players: players });
      this.state.players = players;
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
    const {players} = this.state;
    const availablePlayers = players.filter(p => !p.rostered);
    const columns = [
      {
        name: 'Rank',
        selector: 'rank',
        sortable: true,
      },
      {
        name: 'Positional Rank',
        selector: 'displayPosition',
        sortable: true,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'PPG',
        selector: 'ppg',
        sortable: true,
      },
      {
        cell: (row) => <Button data-rank={row.rank} onClick={this.draftPlayer}>Draft</Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];

    return (
      <DataTable
        title="Available Players"
        columns={columns}
        data={availablePlayers}
      />
    );
  }
}

export default Board;
