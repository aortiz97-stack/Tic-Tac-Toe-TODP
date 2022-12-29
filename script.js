/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const boardGame = (() => {
  const board = [];

  const gameCompleted = (document) => {
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

  const _addEventListener = (controlPlayer, otherPlayer, document) => {
    let clicked = false;
    const htmlBoard = document.querySelector('.game-board');
    htmlBoard.addEventListener('click', (e) => {
      console.log(`target: ${e.target}`);
      if (e.target.innerHTML !== 'X' && e.target.innerHTML !== 'O') {
        clicked = true;
        e.target.innerHTML = controlPlayer.markerType;
        const oldControlPlayer = controlPlayer;
        controlPlayer = otherPlayer;
        otherPlayer = oldControlPlayer;
        console.log(`controlPlayer: ${controlPlayer.name}`);
        console.log(`otherPlayer: ${otherPlayer.name}`);
      }
      if (gameCompleted(document)) {
        alert('GAME COMPLETED');
      }
    });
    return { controlPlayer, otherPlayer, clicked };
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
    let newPlayerPositions = playOneRound(document, controlPlayer, otherPlayer);
    console.log('passed');
    /* for (let i = 0; i < 1; i += 1) {
      const newPlayerPositions = playOneRound(document, controlPlayer, otherPlayer);
      controlPlayer = newPlayerPositions.controlPlayer;
      otherPlayer = newPlayerPositions.otherPlayer;
    } */
    /* let newPlayerPositions = playOneRound(document, controlPlayer, otherPlayer); */

    /*
    controlPlayer = newPlayerPositions.controlPlayer;
    otherPlayer = newPlayerPositions.otherPlayer;
    newPlayerPositions = playOneRound(document, controlPlayer, otherPlayer);*/
  };

  const createBoard = (document, controlPlayer, otherPlayer) => {
    if (board.length === 0) {
      for (let i = 0; i < 3; i += 1) {
        const row = [];
        board.push(row);
      }
    }
    _displayBoard(document, controlPlayer, otherPlayer);
    return { board };
  };

  return { createBoard, gameCompleted };
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
  const _initialize = (document) => {
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
    const board = boardGame.createBoard(document, Player1, Player2);
    return { board, Player1, Player2 };
  };

  const switchTurn = (player1, player2, controller = player1) => {
    let otherPlayer;
    if (controller === player1) {
      controller = player2;
      otherPlayer = player1;
    } else {
      controller = player1;
      otherPlayer = player2;
    }
    return { controller, otherPlayer };
  };

  const play = (document) => {
    const gameComponents = _initialize(document);
    const { Player1 } = gameComponents;
    const { Player2 } = gameComponents;
    const { board } = gameComponents;
    let controller = Player1;
    let otherPlayer = Player2;

    if (controller.turnEnded) {
      const switchingMethod = switchTurn(Player1, Player2, controller);
      controller = switchingMethod.controller;
      otherPlayer = switchingMethod.otherPlayer;
      boardGame.createBoard(document, controller, otherPlayer);
    }
  };

  return { play };
})();

const player1 = Player('Armando', 'X', 'inconclusive');
const player2 = Player('Jose', 'O', 'inconclusive');
boardGame.createBoard(document, player1, player2);

/* playGame.play(document); */
