export const MIN_PLAYERS = 1;
export const MAX_PLAYERS = 6;

export const gameTimers = {
  normal: {
    draw: 20,
    guess: 10,
    select: 10,
  },
  fast: {
    draw: 10,
    guess: 5,
    select: 5,
  },
  slow: {
    draw: 40,
    guess: 15,
    select: 15,
  },
};


export const gameStatus = {
  WAIT_FOR_START: 'WAIT_FOR_START',
  DRAW: 'DRAW',
  GUESS: 'GUESS',
  SELECT: 'SELECT',
  END: 'END',
};
