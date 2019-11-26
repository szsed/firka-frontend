import { gameStatus } from "../../constants/constants";
import { UPDATE_GAME_DATA, NEXT_ROUND, GAME_STATUS_CHANGE, SEND_DRAWING, SEND_GUESS, ALL_GUESSES_SENT, CORRECT_ANSWER_IS, SEND_CHOICE, SELECT_GAME, STOP_GAME } from "../actions/types";

const { WAIT_FOR_START, GUESS, END } = gameStatus;

const initialState = {
  gameStatus: WAIT_FOR_START,
  gameData: null,
  roundCounter: 0,
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
    case UPDATE_GAME_DATA:
      return {
        ...state,
        gameData: action.payload,
      }
    case NEXT_ROUND:
      return {
        ...state,
        roundCounter: state.roundCounter + 1,
        guessIsSent: false,
        allGuessesAreSent: false,
        correctAnswer: '',
        choiceSent: false,
        allChoicesSent: false,
        gameStatus: GUESS,
      };
    case GAME_STATUS_CHANGE:
      return {
        ...state,
        gameStatus: action.payload,
      };
    case SEND_DRAWING:
      return {
        ...state,
        drawingIsSent: true,
      };
    // case 'ALL_DRAWINGS_SENT':
    //   return {
    //     ...state,
    //     allDrawingsAreSent: true,
    //   }
    case SEND_GUESS:
      return {
        ...state,
        guessIsSent: true,
      }
    case ALL_GUESSES_SENT:
      return {
        ...state,
        allGuessesAreSent: true,
      }
    case CORRECT_ANSWER_IS:
      return {
        ...state,
        correctAnswer: action.payload,
      }
    case SEND_CHOICE:
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
    case SELECT_GAME:
      return {
        ...initialState,
        listener: action.payload,
      }
    case STOP_GAME:
      state.listener();
      return {
        ...state,
        gameStatus: END,
        listener: null,
      }
    default:
      return state;
  };
}

export default currentGameReducer;
