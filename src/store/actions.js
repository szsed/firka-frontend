import { createGameListListener, sendImageToFirestore, sendGuessToFirestore, sendScoreToFirestore } from "../services/firebase/firebase-services"
import store from "./store";

const playerNumber = 3;

export const addListOfGamesListenerAction = () => {
  const userId = store.getState().user.id;
  const listener = createGameListListener(userId);
  return { type: 'ADD_LISTENER', payload: listener };
}

export const stopListOfGamesListenerAction = () => {
  return { type: 'STOP_LISTENER' };
}

// export const refreshGamesAction = () => {
//   return dispatch => {
//     return refreshGame()
//       // mi kell ennek??? ez jó függvény itt???
//       .then(response => {
//         const dataOfGames = response.json;
//         // ez így gut???
//         dispatch({ type: 'REFRESH_GAMES', payload: dataOfGames });
//       })
//   }
// }

// export const loginAction = () => {
//   return dispatch => {
//     return loginUser(username, password)
//       // mi kell ennek??? ez jó függvény itt???
//       .then(response => {
//         const userData = response.json;
//         // ez így gut???
//         dispatch({ type: 'LOGIN', payload: userData });
//       })
//   }
// }

// export const logoutAction = () => {
//   return { type: 'LOGOUT' };
// }

// export const addScoresToLeaderboardAction = () => {
//   return dispatch => {
//     return addScoresToLeaderboard()
//       // mi kell ennek??? ez jó függvény itt???            
//       .then(response => {
//         const scoresData = response.json;
//         // ez így gut???
//         dispatch({ type: 'ADD_SCORES', payload: scoresData });
//       })
//   }
// }

// export const updateGameStatsAction = () => {
//   return dispatch => {
//     return updateGameStats()
//       // mi kell ennek??? ez jó függvény itt???
//       .then(response => {
//         const gameStats = response.json;
//         // ez így gut???
//         dispatch({ type: 'UPDATE_GAMESTATS', payload: gameStats });
//       })
//   }
// }

// -----------------------------------------------------------------------------------

export const nextRoundAction = () => {
  return { type: 'NEXT_ROUND' };
}

export const sendDrawingAction = (drawing) => {
  const userId = store.getState().user.id;
  sendImageToFirestore(userId, drawing);
  return { type: 'SEND_DRAW' };
}

export const sendGuessAction = (guess) => {
  const userId = store.getState().user.id;
  if (userId !== store.getState().game.gameStats.players[roundCounter].id) {
    sendGuessToFirestore(userId, guess);
  } else {
    sendGuessToFirestore(userId, store.getState().game.gameStats.players[roundCounter].word)
  }
  return { type: 'SEND_GUESS' };
}

export const sendChoiceAction = (choice) => {
  const userId = store.getState().user.id;
  let userIdRelatedToTheChosenGuess = 0;
  if (choice !== store.getState().game.gameStats.players[roundCounter].word) {
    for (let i = 0; i < store.getState().game.gameStats.players.length; i++) {
      if (store.getState().game.gameStats.players[i].guesses[roundCounter] === choice) {
        userIdRelatedToTheChosenGuess = store.getState().game.gameStats.players[i].id;
      }
    }
    sendScoreToFirestore(userIdRelatedToTheChosenGuess, 5)
    return { type: 'SEND_CHOICE' };
  } else {
    sendScoreToFirestore(userId, 10);
    sendScoreToFirestore(store.getState().game.gameStats.players[roundCounter].id, 10)
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
  if (currentNumberOfDrawings === playerNumber) {
    return { type: 'ALL_DRAWINGS_SENT' };
  }
}

export const areAllGuessesSentAction = () => {
  let currentNumberOfGuesses = 0;
  for (let i = 0; i < store.getState().game.gameStats.players.length; i++) {
    if (store.getState().game.gameStats.players[i].guesses.length === roundCounter) {
      currentNumberOfGuesses++;
    }
  }
  if (currentNumberOfGuesses === playerNumber) {
    return { type: 'ALL_GUESSES_SENT' };
  }
}

// export const areAllChoicesSentAction = () => {
//   let currentNumberOfChoices = 0;
//   for (let i = 0; i < gameStats.players.length; i++) {
//     if (gameStats.players[i].guesses.length === roundCounter) {
//       currentNumberOfChoices++;
//     }
//   }
//   if (currentNumberOfChoices === playerNumber) {
//     return { type: 'ALL_CHOICES_SENT' };
//   }
// }

export const endGameAction = () => {
  return { type: 'STOP_GAME' };
}

export const startGameAction = () => {
  const gameId = store.getState().game.id;
  // kell game id az adatbázisba (vagy van már?)
  const listener = startGameInFirestore(gameId);
  return { type: 'START_GAME', payload: listener };
}
