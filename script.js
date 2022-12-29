/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const boardGame = (() => {
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
    const htmlBoard = document.querySelector('.game-board');
    htmlBoard.addEventListener('click', (e) => {
      if (e.target.innerHTML !== 'X' && e.target.innerHTML !== 'O') {
        e.target.innerHTML = controlPlayer.markerType;
        const oldControlPlayer = controlPlayer;
        controlPlayer = otherPlayer;
        otherPlayer = oldControlPlayer;
      }
      if (gameCompleted(document)) {
        alert('GAME COMPLETED');
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

/*const player1 = Player('Armando', 'X', 'inconclusive');
const player2 = Player('Jose', 'O', 'inconclusive');
boardGame.createBoard(document, player1, player2);*/

playGame.play(document);
