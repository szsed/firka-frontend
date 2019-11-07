import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebaseServices from './services/firebase/firebase-services';

// const gameListListener = firebaseServices.createGameListListener();

const testData = {
  status: 'lobby',
  players: [
    {
      id: 'cica',
      name: 'testName',
      word: 'kutyálmajom',
      picture: null,
      guesses: [],
      score: 0,
    }
  ]
}

const newGameId = firebaseServices.addGameToFirestore(testData);

const gameListener = newGameId.then(gameId => {
  return firebaseServices.createCurrentGameListener(gameId)
});

newGameId.then(gameId => {
  setTimeout(() => {
    firebaseServices.startGameInFirestore(gameId)
  }, 1000);

  setTimeout(() => {
    firebaseServices.endGameInFirestore(gameId)
  }, 2000);
});

gameListener.then(listener => {
  setTimeout(() => {
    console.log('KILL LISTENER')
    listener();
  }, 3000)
})

// setTimeout(() => {
//   firebaseServices.sendImageToFirestore('cica', 'asdasd')
// }, 1000);

// gameListListener();

// firebaseServices.addGameToFirestore(testData);

ReactDOM.render(null, document.getElementById('root'));

