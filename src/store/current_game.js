const initialState = {
  gameStatus: 'lobby',
  //lobby, gameLobby, draw, guess, select, gameEnd
  roundCounter: 1,
  drawingIsSent: false,
  allDrawingsAreSent: false,
  guessIsSent: false,
  allGuessesAreSent: false,
  correctAnswer: '',
  choiceSent: false,
  allChoicesSent: false,
  listener: null,
};

const currentGameReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'SEND_DRAW':
      console.log('asd');
      return {
        ...state,
        drawingIsSent: true,
      };
    case 'GAME_STATUS_CHANGE':
      return {
        ...state,
        gameStatus: action.payload,
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
    case 'ALL_CHOICES_SENT':
      return {
        ...state,
        allChoicesSent: true,
      }
    case 'START_GAME':
      return {
        ...state,
        listener: action.payload,
      }
    case 'STOP_GAME':
      return {
        ...state,
        listener: null,
      }
  };
  return state;
}

export default currentGameReducer;
