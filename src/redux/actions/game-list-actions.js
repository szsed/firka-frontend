import { createGameListListener, joinGameInFirestore, createCurrentGameListener, addGameToFirestore } from "../../services/firebase/firebase-services"
import store from "../store";
import { SELECT_GAME, ADD_LOBBY_LISTENER, STOP_LOBBY_LISTENER } from "./types";

const getNumberOfPlayers = () => {
  return 3;
};

export const addListOfGamesListenerAction = () => {
  const listener = createGameListListener();
  return { type: ADD_LOBBY_LISTENER, payload: listener };
}

export const stopListOfGamesListenerAction = () => {
  return { type: STOP_LOBBY_LISTENER };
}

export const createGameAction = (userData) => {
  return dispatch => {
    const gameId = addGameToFirestore(userData);
    return gameId.then(gameId => {
      const listener = createCurrentGameListener(gameId);
      return dispatch({ type: SELECT_GAME, payload: listener });
    })
  }
}

export const selectGameAction = (gameId) => {
  let userData = store.getState().user;
  const gameData = store.getState().lobby.openGames.find(game => game.id === gameId);
  const playerIndex = gameData.players.length;
  userData = {
    ...userData,
    guesses: [],
    word: gameData.words[playerIndex],
    score: 0,
    drawing: null,
  }
  const listener = createCurrentGameListener(gameId);
  joinGameInFirestore(gameId, userData)
  return { type: SELECT_GAME, payload: listener }
}
