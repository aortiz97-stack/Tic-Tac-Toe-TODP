/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const boardGame = ((document) => {
  const _displayEmptyBoard = () => {
    const board = document.querySelector('.game-board');
    for (let i = 1; i < 10; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add(`cell${i}`);
      board.appendChild(cell);
    }
  };

  const createEmptyBoard = () => {
    const board = [];

    for (let i = 0; i < 3; i += 1) {
      const row = [];
      board.push(row);
    }
    _displayEmptyBoard();
    return board;
  };

  return { createEmptyBoard };
})(document);

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
    return {board, Player1, Player2};
  };

  const play = () => {
    _initialize();
  };

  return { play };
})();
