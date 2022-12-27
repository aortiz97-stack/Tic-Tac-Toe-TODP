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

console.log(boardGame.createEmptyBoard());
