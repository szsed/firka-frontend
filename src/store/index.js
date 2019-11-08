import { combineReducers } from 'redux';
import userReducer from './user';
import gameReducer from './games';
import currentGameReducer from './current_game';

const rootReducer = combineReducers({
  user: userReducer,
  lobby: gameReducer,
  game: currentGameReducer,
});

export default rootReducer;
