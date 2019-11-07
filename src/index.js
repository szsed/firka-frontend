import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebaseServices from './services/firebase/firebase-services';

const gameListListener = firebaseServices.createGameListListener();

const testData = {
  status: 'lobby',
  players: [
    {
      id: 'cica',
      name: 'testName',
      picture: null,
      guesses: [],
      score: 0,
    }
  ]
}

// firebaseServices.addGameToFirestore(testData);

setTimeout(() => {
  firebaseServices.sendImageToFirestore('cica', 'asdasdasdasd')
}, 1000) ;

// gameListListener();

// firebaseServices.addGameToFirestore(testData);

ReactDOM.render(null, document.getElementById('root'));

