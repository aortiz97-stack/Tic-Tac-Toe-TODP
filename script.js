/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
class BoardGame {
  constructor(document, controlPlayer, otherPlayer) {
    this.document = document;
    this.controlPlayer = controlPlayer;
    this.otherPlayer = otherPlayer;
    this.createBoard(this.document, this.controlPlayer, this.otherPlayer);
  }

  get controlPlayer() {
    return this._controlPlayer;
  }

  set controlPlayer(controlPlayer) {
    this._controlPlayer = controlPlayer;
  }

  get otherPlayer() {
    return this._otherPlayer;
  }

  set otherPlayer(otherPlayer) {
    this._otherPlayer = otherPlayer;
  }

  _gameTied() {
    let gameFinished = true;
    const htmlBoard = document.querySelector('.game-board');
    const cells = htmlBoard.children;

    for (let i = 0; i < cells.length; i += 1) {
      if (cells[i].innerHTML === '') {
        gameFinished = false;
      }
    }
    return gameFinished;
  }

  _gameBeat() {
    function winnableLine(n1, n2, n3) {
      const cells = document.querySelector('.game-board').children;
      const rowWinningCells = [];
      for (let i = 0; i < cells.length; i += 1) {
        const cell = cells[i];
        const cellClassList = cells[i].classList;
        const cellClass = cellClassList[0];

        if (cellClass[cellClass.length - 1] === n1.toString()
         || cellClass[cellClass.length - 1] === n2.toString()
          || cellClass[cellClass.length - 1] === n3.toString()) {
          rowWinningCells.push(cell);
        }
      }
      return rowWinningCells;
    }
    // Function takes divs of a winnable line (i.e. row, column, diagonal),
    // and puts all winnable line combos for that particular type of line into one array
    function packageWinnableLines(winnableLine1, winnableLine2, winnableLine3 = undefined) {
      const winnableLines = [];
      winnableLines.push(winnableLine1);
      winnableLines.push(winnableLine2);
      if (winnableLine3 !== undefined) {
        winnableLines.push(winnableLine3);
      }
      return winnableLines;
    }

    function lineWon(n1, n2, n3, n4, n5, n6, n7 = undefined, n8 = undefined, n9 = undefined) {
      const line1 = winnableLine(n1, n2, n3);
      const line2 = winnableLine(n4, n5, n6);
      let line3;
      if (n9 !== undefined) {
        line3 = winnableLine(n7, n8, n9);
      }
      const winnableLines = packageWinnableLines(line1, line2, line3);

      for (let i = 0; i < winnableLines.length; i += 1) {
        const line = winnableLines[i];
        const firstMarker = line[0].innerHTML;
        for (let j = 0; j < line.length; j += 1) {
          const cell = line[j];
          if (firstMarker !== '' && cell.innerHTML === firstMarker && j === line.length - 1 && line[1].innerHTML === firstMarker) {
            return true;
          }
        }
      }
      return false;
    }

    function _matchOver() {
      const rowWon = lineWon(1, 2, 3, 4, 5, 6, 7, 8, 9);
      const colWon = lineWon(1, 4, 7, 2, 5, 8, 3, 6, 9);
      const diagonalWon = lineWon(1, 5, 9, 3, 5, 7);

      return (rowWon || colWon || diagonalWon);
    }

    const gameWon = _matchOver();
    return gameWon;
  }

  _addEventListener() {
    const htmlBoard = document.querySelector('.game-board');
    htmlBoard.addEventListener('click', (e) => {
      if (e.target.innerHTML !== 'X' && e.target.innerHTML !== 'O' && !this._gameBeat(document)) {
        e.target.innerHTML = this._controlPlayer.markerType;
        const oldControlPlayer = this._controlPlayer;
        this._controlPlayer = this._otherPlayer;
        this._otherPlayer = oldControlPlayer;
      }
      if (this._gameBeat()) {
        alert(`${this._otherPlayer.name} won the game!`);
      }
      if (this._gameTied() && !this._gameBeat()) {
        alert('Cat game! Please reset the board and try again');
      }
    });
  }

  _displayBoard() {
    const HTMLboard = document.querySelector('.game-board');
    HTMLboard.innerHTML = '';
    for (let i = 1; i < 10; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add(`cell${i}`);
      HTMLboard.appendChild(cell);
    }
    this._addEventListener();
  }

  createBoard() {
    this._displayBoard();
  }
}

class Player {
  constructor(name, markerType) {
    this.name = name;
    this.markerType = markerType;
  }

  get markerType() {
    return this._markerType;
  }

  /**
     * @param {any} markerType
     */
  set markerType(newMarkerType) {
    this._markerType = newMarkerType;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }
}

class PlayGame {
  constructor(document) {
    this.document = document;
    this.play();
  }

  resetButton() {
    const htmlButton = document.querySelector('button');
    htmlButton.addEventListener('click', () => {
      const htmlBoard = document.querySelector('.game-board');
      const cells = Array.from(htmlBoard.children);
      cells.forEach((cell) => {
        cell.innerHTML = '';
      });
    });
  }

  play() {
    const player1Name = prompt('Player one, please enter your name:');
    let player1Marker = prompt(('Please choose which marker you would like to use (i.e. x or o)')).toUpperCase();
    while (!['X', 'x', 'O', 'o'].includes(player1Marker)) {
      player1Marker = prompt("Invalid marker. Please choose only from 'x' or 'o'.");
    }
    const Player1 = new Player(player1Name, player1Marker);
    const player2Name = prompt('Player two, please enter your name:');
    let player2Marker;
    if (player1Marker === 'X') {
      player2Marker = 'O';
    } else {
      player2Marker = 'X';
    }
    const Player2 = new Player(player2Name, player2Marker);
    this.resetButton(document);
    const boardGame = new BoardGame(document, Player1, Player2);
  }
}

const game = new PlayGame();
