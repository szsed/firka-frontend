'use strict';

import store from './store';

const initialState = {
  gameStatus: 'lobby',
  roundCounter: 1,
  drawingIsSent: false,
};

const currentGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_ROUND':
      return {
        roundCounter: roundCounter++,
      }
    case 'SEND_DRAW':
      return {
        drawingIsSent: true,
      }
    case 'GAME_STATUS_CHANGE':
      return {
        gameStatus: action.payload,
      }  
  };
  return state;
}

currentGameReducer(null, {type: 'NEXT_ROUND'});
console.log(store.getState());

export default currentGameReducer;
