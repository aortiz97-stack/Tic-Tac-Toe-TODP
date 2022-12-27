const boardGame = (() => {
  const createEmptyBoard = () => {
    const board = [];

    for (let i = 0; i < 3; i += 1) {
      const row = [];
      board.push(row);
    }
    return board;
  };

  return { createEmptyBoard };
})();

console.log(boardGame.createEmptyBoard());
