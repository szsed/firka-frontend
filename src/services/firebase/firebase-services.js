import firestoreDB from "./firebase-setup";
import store from "../../store/store";

export const createGameListListener = () => {
  return firestoreDB.where('status', '==', 'lobby').onSnapshot(querySnapshot => {
    const gamesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    store.dispatch({ type: 'REFRESH_GAMES', payload: gamesData });
  });
}

export const createCurrentGameListener = gameId => {
  return firestoreDB.doc(gameId).onSnapshot(doc => {
    store.dispatch({
      type: 'UPDATE_GAMESTATS',
      payload: {
        ...doc.data(),
        id: doc.id
      },
    })
  });
}

export const addGameToFirestore = gameData => {
  return firestoreDB.add(gameData).then(doc => doc.id);
}

export const joinGameInFirestore = (gameId, userData) => {
  return firestoreDB.doc(gameId).get().then(doc => {
    console.log(doc);
    const players = doc.data().players;
    players.push(userData);
    return firestoreDB.doc(gameId).update({
      players,
    })
  })
}


export const startGameInFirestore = (gameId) => {
  return firestoreDB.doc(gameId).update({
    status: 'inprogress',
  })
}

export const endGameInFirestore = (gameId) => {
  firestoreDB.doc(gameId).update({
    status: 'finished',
  })
}

export const getCurrentGameInfo = userId => {
  return new Promise(resolve => {
    firestoreDB.where('status', '==', 'inprogress').get().then(docs => {
      if (!docs) return null;
      const gamesList = []
      docs.forEach(doc => gamesList.push({
        id: doc.id,
        data: doc.data()
      }));
      const currentGameData = gamesList.filter(game => game.data.players.some(player => player.id === userId))[0];
      resolve(currentGameData);
    });
  });
}

export const sendImageToFirestore = (userId, imgData) => {
  return getCurrentGameInfo(userId)
    .then(game => {
      const thisPlayer = game.data.players.find(player => player.id === userId)
      thisPlayer.drawing = imgData;
      firestoreDB.doc(game.id).update({
        players: game.data.players
      })
    });
}

export const sendGuessToFirestore = (userId, guess) => {
  return getCurrentGameInfo(userId)
    .then(game => {
      const thisPlayer = game.data.players.find(player => player.id === userId)
      thisPlayer.guesses.push(guess);
      firestoreDB.doc(game.id).update({
        players: game.data.players
      })
    });
}

export const sendScoreToFirestore = (userId, score) => {
  return getCurrentGameInfo(userId)
    .then(game => {
      const thisPlayer = game.data.players.find(player => player.id === userId)
      thisPlayer.score += score;
      firestoreDB.doc(game.id).update({
        players: game.data.players
      })
    });
}
