/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const boardGame = (() => {
  let turnEnded = false;
  const _gameCompleted = (document) => {
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

  const _addEventListener = (cell, player, document) => {
    turnEnded = false;

    cell.addEventListener('click', () => {
      if (cell.innerHTML !== 'X' && cell.innerHTML !== 'O') {
        cell.innerHTML = player.markerType;
        turnEnded = true;
      }
      if (_gameCompleted(document)) {
        alert('GAME COMPLETED');
      }
    });
  };
  const _displayBoard = (document, player) => {
    const board = document.querySelector('.game-board');
    for (let i = 1; i < 10; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add(`cell${i}`);
      _addEventListener(cell, player, document);
      board.appendChild(cell);
    }
  };
  const createBoard = (document, player) => {
    const board = [];

    for (let i = 0; i < 3; i += 1) {
      const row = [];
      board.push(row);
    }
    _displayBoard(document, player);
    return { board };
  };

  return { createBoard, turnEnded };
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
  const _initialize = (document) => {
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
    const board = boardGame.createBoard(document, Player1);
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

  const play = (document) => {
    const gameComponents = _initialize(document);
    const { Player1 } = gameComponents;
    const { Player2 } = gameComponents;
    const { board } = gameComponents;
    let controller = Player1;

    const { turnEnded } = board;
    if (turnEnded) {
      controller = switchTurn(Player1, Player2, controller);
      board.turnEnded = false;
    }
  };

  return { play };
})();

const player = Player('Armando', 'X', 'inconclusive');
console.log(player.markerType);
boardGame.createBoard(document, player);

/* playGame.play(document); */
