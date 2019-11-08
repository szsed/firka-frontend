import { createGameListListener, sendImageToFirestore, sendGuessToFirestore, sendScoreToFirestore, joinGameInFirestore, startGameInFirestore, createCurrentGameListener, addGameToFirestore } from "../services/firebase/firebase-services"
import store from "./store";

export const playerNumber = () => {
  return 3;
};

export const currentRound = () => {
  return store.getState().roundCounter;
}

export const addListOfGamesListenerAction = () => {
  const listener = createGameListListener();
  return { type: 'ADD_LISTENER', payload: listener };
}

export const stopListOfGamesListenerAction = () => {
  return { type: 'STOP_LISTENER' };
}

export const nextRoundAction = () => {
  return { type: 'NEXT_ROUND' };
}

export const sendDrawingAction = (drawing) => {
  const userId = store.getState().user.playerDetails.id;
  sendImageToFirestore(userId, drawing);
  return { type: 'SEND_DRAW' };
}

export const sendGuessAction = (guess) => {
  const userId = store.getState().user.playerDetails.id;
  if (userId !== store.getState().game.gameStats.players[currentRound() - 1].id) {
    sendGuessToFirestore(userId, guess);
  } else {
    sendGuessToFirestore(userId, store.getState().game.gameStats.players[currentRound() - 1].word)
  }
  return { type: 'SEND_GUESS' };
}

export const sendChoiceAction = (choice) => {
  const userId = store.getState().user.playerDetails.id;
  let userIdRelatedToTheChosenGuess = 0;
  if (choice !== store.getState().game.gameStats.players[currentRound() - 1].word) {
    for (let i = 0; i < store.getState().game.gameStats.players.length; i++) {
      if (store.getState().game.gameStats.players[i].guesses[currentRound() - 1] === choice) {
        userIdRelatedToTheChosenGuess = store.getState().game.gameStats.players[i].id;
      }
    }
    sendScoreToFirestore(userIdRelatedToTheChosenGuess, 5)
    return { type: 'SEND_CHOICE' };
  } else {
    sendScoreToFirestore(userId, 10);
    sendScoreToFirestore(store.getState().game.gameStats.players[currentRound() - 1].id, 10)
    return { type: 'SEND_CHOICE' };
  }
}

export const areAllDrawingsSentAction = () => {
  let currentNumberOfDrawings = 0;
  for (let i = 0; i < store.getState().game.gameStats.players.length; i++) {
    if (store.getState().game.gameStats.players[i].drawing !== null) {
      currentNumberOfDrawings++;
    }
  }
  if (currentNumberOfDrawings === playerNumber()) {
    return { type: 'ALL_DRAWINGS_SENT' };
  }
}

export const areAllGuessesSentAction = () => {
  let currentNumberOfGuesses = 0;
  for (let i = 0; i < store.getState().game.gameStats.players.length; i++) {
    if (store.getState().game.gameStats.players[i].guesses.length === currentRound()) {
      currentNumberOfGuesses++;
    }
  }
  if (currentNumberOfGuesses === playerNumber()) {
    return { type: 'ALL_GUESSES_SENT' };
  }
}

export const endGameAction = () => {
  return { type: 'STOP_GAME' };
}



export const createGameAction = (userData) => {
  return dispatch => {
    const gameId = addGameToFirestore(userData);
    return gameId.then(gameId => {
      const listener = createCurrentGameListener(gameId);
      return dispatch({ type: 'SELECT_GAME', payload: listener });
    })

  }
}

export const selectGameAction = (gameId) => {
  let userData = store.getState().user.playerDetails;
  const gameData = store.getState().lobby.currentGames.find(game => game.id === gameId);
  const playerIndex = gameData.players.length;
  userData = {
    ...userData,
    guesses: [],
    word: gameData.words[playerIndex],
    drawing: null,
  }
  const listener = createCurrentGameListener(gameId);
  joinGameInFirestore(gameId, userData)
  return { type: 'SELECT_GAME', payload: listener }
}

export const startGameAction = () => {
  const gameId = store.getState().game.gameStats.id;
  startGameInFirestore(gameId);
  return { type: 'GAME_STATUS_CHANGE', payload: 'draw' };
}

export const changeGameStatusAction = (toWhichStatusToChange) => {
  return { type: 'GAME_STATUS_CHANGE', payload: toWhichStatusToChange };
}

export const whatIsTheCorrectAnswerAction = () => {
  const correctAnswer = store.getState().game.gameStats.players[currentRound() - 1].word;
  return { type: 'CORRECT_ANSWER_IS', payload: correctAnswer }
}

export const blockGuessingAction = () => {
  const userId = store.getState().user.playerDetails.id;
  if (userId !== store.getState().game.gameStats.players[currentRound() - 1].id) {
    return null;
  } else {
    return 'Kérlek várj, amíg a többiek szavaznak!'
    // ^^ ez így jó?
  }
}

export const buidlingChoicesAction = () => {
  const userId = store.getState().user.playerDetails.id;
  if (userId !== store.getState().game.gameStats.players[currentRound() - 1].id) {
    return null;
  } else {
    return 'Kérlek várj, amíg a többiek választanak!'
    // ^^ ez így jó?
  }
}

