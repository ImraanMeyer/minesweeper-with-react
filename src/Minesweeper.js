import React, { Component } from 'react';
import './App.css';
import Board from './components/board/Board';
import BoardHead from './components/boardhead/BoardHead';

export default class Minesweeper extends Component {
  constructor() {
    super();

    this.state = {
      status: 'waiting', // can be winning, running, waiting
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      time: 0,
      openCells: 0
    };

    this.baseState = this.state;
  }

  endGame = () => {
    this.setState({
      status: 'ended'
    });
  };

  componentDidUpdate(nextProps, nextState) {
    if (this.state.status === 'running') {
      this.checkForWinner();
    }
  }
  checkForWinner = () => {
    if (
      this.state.mines + this.state.openCells >=
      this.state.rows * this.state.columns
    ) {
      this.setState(
        {
          status: 'winner'
        },
        alert('You won!')
      );
    }
  };

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intervals = [];
    });
  };

  componentWillMount() {
    this.intervals = [];
  }

  tick = () => {
    if (this.state.openCells > 0 && this.state.status === 'running') {
      const time = this.state.time + 1;
      this.setState({ time });
    }
  };

  setInterval = (f, t) => {
    this.intervals.push(setInterval(f, t));
  };

  hanldeCellClick = () => {
    if (this.state.openCells === 0 && this.state.status !== 'running') {
      this.setState(
        {
          status: 'running'
        },
        this.setInterval(this.tick, 1000)
      );
    }
    this.setState(prevState => {
      return {
        openCells: prevState.openCells + 1
      };
    });
  };

  changeFlagAmount = amount => {
    this.setState({ flags: this.state.flags + amount });
  };

  render() {
    return (
      // Passing in props from the state
      <div className="minesweeper">
        <h2>Minesweeper with React!</h2>
        <BoardHead
          time={this.state.time}
          flags={this.state.flags}
          reset={this.reset}
          status={this.state.status}
        />
        <Board
          status={this.state.status}
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          handleCellClick={this.hanldeCellClick}
          endGame={this.endGame}
          changeFlagAmount={this.changeFlagAmount}
        />
      </div>
    );
  }
}
