import { combineReducers } from 'redux';
import userReducer from './user';
import gameReducer from './games';
import currentGameReducer from './current_game';
import leaderboardReducer from './leaderboard';

const rootReducer = combineReducers({
    user: userReducer,
    gameList: gameReducer,
    game: currentGameReducer
    // leaderboardReducer,
});

console.log(rootReducer);

export default rootReducer;
