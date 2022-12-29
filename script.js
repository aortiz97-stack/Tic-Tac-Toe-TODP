/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const boardGame = (() => {
  const gameTied = (document) => {
    let gameFinished = true;
    const htmlBoard = document.querySelector('.game-board');
    const cells = htmlBoard.children;

    for (let i = 0; i < cells.length; i += 1) {
      if (cells[i].innerHTML === '') {
        gameFinished = false;
      }
    }
    return gameFinished;
  };

  const gameBeat = (document) => {
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

    function matchOver() {
      const rowWon = lineWon(1, 2, 3, 4, 5, 6, 7, 8, 9);
      const colWon = lineWon(1, 4, 7, 2, 5, 8, 3, 6, 9);
      const diagonalWon = lineWon(1, 5, 9, 3, 5, 7);

      return (rowWon || colWon || diagonalWon);
    }

    const answer = matchOver();
    return answer;
  };

  const _addEventListener = (controlPlayer, otherPlayer, document) => {
    const htmlBoard = document.querySelector('.game-board');
    htmlBoard.addEventListener('click', (e) => {
      if (e.target.innerHTML !== 'X' && e.target.innerHTML !== 'O') {
        e.target.innerHTML = controlPlayer.markerType;
        const oldControlPlayer = controlPlayer;
        controlPlayer = otherPlayer;
        otherPlayer = oldControlPlayer;
      }
      console.log(`e.target.innerHTML: ${e.target.innerHTML}`);
      if (gameBeat(document)) {
        alert('Game beat');
      }
      if (gameTied(document)) {
        alert('GAME TIED');
      }
    });
    return { controlPlayer, otherPlayer };
  };

  const playOneRound = (document, controlPlayer, otherPlayer) => {
    const HTMLboard = document.querySelector('.game-board');
    HTMLboard.innerHTML = '';
    for (let i = 1; i < 10; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add(`cell${i}`);
      HTMLboard.appendChild(cell);
    }
    const newPlayerPositions = _addEventListener(controlPlayer, otherPlayer, document);
    controlPlayer = newPlayerPositions.controlPlayer;
    otherPlayer = newPlayerPositions.otherPlayer;

    return { controlPlayer, otherPlayer };
  };

  const _displayBoard = (document, controlPlayer, otherPlayer) => {
    playOneRound(document, controlPlayer, otherPlayer);
  };

  const createBoard = (document, controlPlayer, otherPlayer) => {
    _displayBoard(document, controlPlayer, otherPlayer);
  };

  return { createBoard, gameBeat };
})();

const Player = (name, markerType, winningStatus) => {
  const changeWinningStatus = (newWinningStatus) => {
    winningStatus = newWinningStatus;
  };
  const turnEnded = false;
  return {
    name, markerType, winningStatus, changeWinningStatus, turnEnded,
  };
};

const playGame = (() => {
  const play = (document) => {
    const player1Name = 'Armando'; /* prompt('Player one, please enter your name:'); */
    const player1Marker = 'X'; /* prompt(('Please choose which marker you would like to use (i.e. x or o)')).toUpperCase(); */
    const Player1 = Player(player1Name, player1Marker, 'inconclusive');
    const player2Name = 'Jose';/* prompt('Player two, please enter your name:'); */
    let player2Marker;
    if (player1Marker === 'X') {
      player2Marker = 'O';
    } else {
      player2Marker = 'X';
    }
    const Player2 = Player(player2Name, player2Marker, 'inconclusive');
    boardGame.createBoard(document, Player1, Player2);
  };
  return { play };
})();

playGame.play(document);

console.log(boardGame.gameBeat(document));
