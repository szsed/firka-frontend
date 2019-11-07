const initialState = [];

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SCORES':
      return action.payload
  };
  return state;
}

export default leaderboardReducer;
