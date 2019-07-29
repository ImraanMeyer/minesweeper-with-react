import React, { Component } from 'react';
import Row from '../row/Row';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.createBoard(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps)
      });
    }
  }

  createBoard = props => {
    // create grid based off the number of columns and rows passed in from props
    let board = [];
    for (let i = 0; i < props.rows; i++) {
      board.push([]);
      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }

    // Add mines randomly
    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomCol = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomCol];

      if (cell.hasMine) {
        // if it already has a mine send it back one in the loop and go to another random cell
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  };

  flag = cell => {
    if (this.props.status === 'ended') {
      return;
    }

    if (!cell.isOpen) {
      let rows = this.state.rows;

      cell.hasFlag = !cell.hasFlag;
      this.setState({ rows });
      this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    }
  };

  open = cell => {
    const asyncCountMines = new Promise(resolve => {
      const mines = this.findMines(cell);
      resolve(mines);
    });
    asyncCountMines.then(numOfMines => {
      const rows = this.state.rows;
      const current = rows[cell.y][cell.x];

      if (current.hasMine && this.props.openCells === 0) {
        console.log('mine was on first click');
        const newRows = this.createBoard(this.props);
        this.setState({ rows: newRows }, () => {
          this.open(cell);
        });
      } else {
        if (!cell.hasFlag && !current.isOpen) {
          this.props.handleCellClick();

          current.isOpen = true;
          current.count = numOfMines;

          this.setState({ rows });

          if (!current.hasMine && numOfMines === 0) {
            this.findAroundCell(cell);
          }

          if (current.hasMine && this.props.openCells !== 0) {
            this.props.endGame();
          }
        }
      }
    });
  };

  findMines = cell => {
    const rows = this.state.rows;
    let minesInProximity = 0;
    // look for mines in a 1 cell block around the chosen cell
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (cell.y + row < rows.length && cell.x + col < rows[0].length) {
            if (
              rows[cell.y + row][cell.x + col].hasMine &&
              !(row === 0 && col === 0)
            ) {
              minesInProximity++;
            }
          }
        }
      }
    }
    return minesInProximity;
  };

  findAroundCell = cell => {
    const rows = this.state.rows;
    // go through each cell and open them until mind is found, break
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (cell.y + row < rows.length && cell.x + col < rows[0].length) {
            if (
              !rows[cell.y + row][cell.x + col].hasMine &&
              !rows[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  };

  render() {
    const rows = this.state.rows.map((cells, index) => (
      <Row cells={cells} flag={this.flag} key={index} open={this.open} />
    ));
    return <div className="board">{rows}</div>;
  }
}

export default Board;
