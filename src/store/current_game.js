const initialState = {
  gameStatus: 'wait_for_start',
  //wait_for_start, draw, guess, select, gameEnd
  gameStats: null,
  roundCounter: 1,
  drawingIsSent: false,
  allDrawingsAreSent: false,
  guessIsSent: false,
  allGuessesAreSent: false,
  correctAnswer: '',
  choiceSent: false,
  // allChoicesSent: false,
  listener: null,
};

const currentGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GAMESTATS':
      return {
        ...state,
        gameStats: action.payload,
      }
    case 'NEXT_ROUND':
      return {
        ...state,
        roundCounter: state.roundCounter + 1,
        guessIsSent: false,
        allGuessesAreSent: false,
        correctAnswer: '',
        choiceSent: false,
        allChoicesSent: false,
        gameStatus: 'guess',
      };
    case 'GAME_STATUS_CHANGE':
      return {
        ...state,
        gameStatus: action.payload,
      };
    case 'SEND_DRAW':
      return {
        ...state,
        drawingIsSent: true,
      };
    case 'ALL_DRAWINGS_SENT':
      return {
        ...state,
        allDrawingsAreSent: true,
      }
    case 'SEND_GUESS':
      return {
        ...state,
        guessIsSent: true,
      }
    case 'ALL_GUESSES_SENT':
      return {
        ...state,
        allGuessesAreSent: true,
      }
    case 'CORRECT_ANSWER_IS':
      return {
        ...state,
        correctAnswer: action.payload,
      }
    case 'SEND_CHOICE':
      return {
        ...state,
        choiceSent: true,
      }
    // case 'ALL_CHOICES_SENT':
    //   return {
    //     ...state,
    //     allChoicesSent: true,
    //   }
    // case 'START_GAME':
    //   return {
    //     ...initialState,
    //     gameStatus: 'draw',
    //   }
    case 'SELECT_GAME':
      return {
        ...initialState,
        listener: action.payload,
      }
    case 'STOP_GAME':
      state.listener();
      return {
        ...state,
        listener: null,
      }
    default:
      return state;
  };
}

export default currentGameReducer;
