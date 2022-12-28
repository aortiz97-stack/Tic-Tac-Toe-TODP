/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const boardGame = (() => {
  const _displayEmptyBoard = (document, player) => {
    const board = document.querySelector('.game-board');
    for (let i = 1; i < 10; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add(`cell${i}`);
      cell.addEventListener('click', () => {
        if (cell.innerHTML !== 'X' && cell.innerHTML !== 'O') {
          cell.innerHTML = player.markerType;
        }
      });
      board.appendChild(cell);
    }
  };

  const createEmptyBoard = (document, player) => {
    const board = [];

    for (let i = 0; i < 3; i += 1) {
      const row = [];
      board.push(row);
    }
    _displayEmptyBoard(document, player);
    return board;
  };

  return { createEmptyBoard };
})();

const Player = (name, markerType, winningStatus) => {
  const changeWinningStatus = (newWinningStatus) => {
    winningStatus = newWinningStatus;
  };
  return {
    name, markerType, winningStatus, changeWinningStatus,
  };
};

const playGame = (() => {
  const _initialize = () => {
    const board = boardGame.createEmptyBoard();

    const player1Name = prompt('Player one, please enter your name:');
    const player1Marker = prompt(('Please choose which marker you would like to use (i.e. x or o)')).toUpperCase();
    const Player1 = Player(player1Name, player1Marker, 'inconclusive');
    const player2Name = prompt('Player two, please enter your name:');
    let player2Marker;
    if (player1Marker === 'X') {
      player2Marker = 'O';
    } else {
      player2Marker = 'X';
    }
    const Player2 = Player(player2Name, player2Marker, 'inconclusive');
    return { board, Player1, Player2 };
  };

  const switchTurn = (player1, player2, controller = player1) => {
    if (controller === player1) {
      controller = player2;
    } else {
      controller = player1;
    }
    return { controller };
  };

  const gameWon = false;

  const play = () => {
    const gameComponents = _initialize();
    let controller = gameComponents.Player1;
    while (!gameWon) {
      const controller = gameComponents.Player2;
    }
  };

  return { play };
})();

const player = Player('Armando', 'X', 'inconclusive');
console.log(player.markerType);
boardGame.createEmptyBoard(document, player);
