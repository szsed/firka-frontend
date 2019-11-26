// import { createGameListListener, sendImageToFirestore, sendGuessToFirestore, sendScoreToFirestore, joinGameInFirestore, startGameInFirestore, createCurrentGameListener, addGameToFirestore } from "../../services/firebase/firebase-services"
// import store from "../store";
// import { ADD_LISTENER, STOP_LISTENER, NEXT_ROUND, SEND_DRAWING, ALL_DRAWINGS_SENT, ALL_GUESSES_SENT, STOP_GAME, SELECT_GAME, GAME_STATUS_CHANGE, CORRECT_ANSWER_IS, SEND_GUESS, SEND_CHOICE, ADD_LOBBY_LISTENER, STOP_LOBBY_LISTENER } from "./types";
// import { gameStatus } from "../../constants/constants";

// const getNumberOfPlayers = () => {
//   return 3;
// };

// const getCurrentRound = () => {
//   return store.getState().game.roundCounter;
// }




// export const areAllDrawingsSentAction = () => {
//   let currentNumberOfDrawings = 0;
//   for (let i = 0; i < store.getState().game.gameData.players.length; i++) {
//     if (store.getState().game.gameData.players[i].drawing !== null) {
//       currentNumberOfDrawings++;
//     }
//   }
//   if (currentNumberOfDrawings === getNumberOfPlayers()) {
//     return { type: ALL_DRAWINGS_SENT };
//   }
// }

// export const areAllGuessesSentAction = () => {
//   let currentNumberOfGuesses = 0;
//   for (let i = 0; i < store.getState().game.gameData.players.length; i++) {
//     if (store.getState().game.gameData.players[i].guesses.length === getCurrentRound()) {
//       currentNumberOfGuesses++;
//     }
//   }
//   if (currentNumberOfGuesses === getNumberOfPlayers()) {
//     return { type: ALL_GUESSES_SENT };
//   }
// }



// export const whatIsTheCorrectAnswerAction = () => {
//   const correctAnswer = store.getState().game.gameData.players[getCurrentRound()].word;
//   return { type: CORRECT_ANSWER_IS, payload: correctAnswer }
// }

// export const blockGuessingAction = () => {
//   const userId = store.getState().user.id;
//   if (userId !== store.getState().game.gameData.players[getCurrentRound()].id) {
//     return null;
//   } else {
//     return 'Kérlek várj, amíg a többiek szavaznak!'
//     // ^^ ez így jó?
//   }
// }

// export const buildingChoicesAction = () => {
//   const userId = store.getState().user.id;
//   if (userId !== store.getState().game.gameData.players[getCurrentRound()].id) {
//     return null;
//   } else {
//     return 'Kérlek várj, amíg a többiek választanak!'
//     // ^^ ez így jó?
//   }
// }
