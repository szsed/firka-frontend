import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draw from './draw';
import Guess from './guess';
import Vote from './vote';
import Results from './results';
import { withRouter } from "react-router-dom";
import { gameStatus } from '../constants/constants';

const { DRAW, GUESS, SELECT, END } = gameStatus;

class GamePage extends Component {
  render() {
    const { gameStatus, history } = this.props;

    switch (gameStatus) {
      case DRAW:
        return <Draw />;
      case GUESS:
        return <Guess />;
      case SELECT:
        return <Vote />;
      case END:
        return <Results />;
      default:
        history.push('/')
        return null;
    };
  }
}

const mapStateToProps = state => {
  return {
    gameStatus: state.game.gameStatus,
  };
}

export default withRouter(connect(mapStateToProps, null)(GamePage));
