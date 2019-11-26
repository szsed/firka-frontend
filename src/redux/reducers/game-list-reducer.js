import { REFRESH_GAMES, ADD_LOBBY_LISTENER, SELECT_GAME } from "../actions/types";

const initialState = {
  openGames: [],
  listener: null,
};

const gameListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_GAMES:
      return {
        ...state,
        openGames: action.payload,
      }
    case ADD_LOBBY_LISTENER:
      return {
        ...state,
        listener: action.payload,
      }
    case SELECT_GAME:
      state.listener();
      return {
        ...state,
        openGames: [],
        listener: null,
      }
    default:
      return state;
  };
}

export default gameListReducer;
