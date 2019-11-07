const initialState = {
  currentGames: [],
  listener: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REFRESH_GAMES':
      return {
        ...state,
        currentGames: action.payload,
      }
    case 'ADD_LISTENER':
      return {
        ...state,
        listener: action.payload,
      }
    case 'STOP_LISTENER':
      return {
        ...state,
        listener: null,
      }
  };
  return state;
}

export default gameReducer;
