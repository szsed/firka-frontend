import { sendImageToFirestore, sendGuessToFirestore, sendScoreToFirestore, startGameInFirestore } from "../../services/firebase/firebase-services"
import store from "../store";
import { NEXT_ROUND, SEND_DRAWING, STOP_GAME, GAME_STATUS_CHANGE, SEND_GUESS, SEND_CHOICE } from "./types";
import { gameStatus } from "../../constants/constants";

const getCurrentRound = () => {
  return store.getState().game.roundCounter;
}

export const startNextRoundAction = () => {
  return { type: NEXT_ROUND };
}

export const sendDrawingAction = (drawing) => {
  const userId = store.getState().user.id;
  sendImageToFirestore(userId, drawing);
  return { type: SEND_DRAWING };
}

export const sendGuessAction = (guess) => {
  const userId = store.getState().user.id;
  if (userId !== store.getState().game.gameData.players[getCurrentRound()].id) {
    sendGuessToFirestore(userId, guess);
  } else {
    sendGuessToFirestore(userId, store.getState().game.gameData.players[getCurrentRound()].word)
  }
  return { type: SEND_GUESS };
}

export const sendChoiceAction = (choice) => {
  const userId = store.getState().user.id;
  const solution = store.getState().game.gameData.words[getCurrentRound()];
  const players = store.getState().game.gameData.players;
  let userIdRelatedToTheChosenGuess = 0;

  if (choice !== solution) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].guesses[getCurrentRound()] === choice) {
        userIdRelatedToTheChosenGuess = players[i].id;
      }
    }
    sendScoreToFirestore(userIdRelatedToTheChosenGuess, 5)
    return { type: SEND_CHOICE };
  } else {
    sendScoreToFirestore(userId, 10);
    sendScoreToFirestore(players[getCurrentRound()].id, 10)
    return { type: SEND_CHOICE };
  }
}

export const startGameAction = () => {
  const gameId = store.getState().game.gameData.id;
  startGameInFirestore(gameId);
  return { type: GAME_STATUS_CHANGE, payload: gameStatus.DRAW };
}

export const changeGameStatusAction = (newStatus) => {
  return { type: GAME_STATUS_CHANGE, payload: newStatus };
}

export const endGameAction = () => {
  return { type: STOP_GAME };
}
