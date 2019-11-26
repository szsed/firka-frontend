import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import currentGameReducer from './current-game-reducer';
import gameListReducer from './game-list-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  lobby: gameListReducer,
  game: currentGameReducer,
});

export default rootReducer;
