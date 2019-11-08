import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draw from './draw';
import Guess from './guess';
import Vote from './vote';
import Results from './results';

class GamePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gameState } = this.props;

    switch (gameState) {
      case 'draw':
        return Draw;
      case 'guess':
        return Guess;
      case 'select':
        return Vote;
      case 'gameEnd':
        return Results;
      default:
        return null;
    };
  }
}

const mapStateToProps = state => {
  return {
    gameState: state.game.gameStatus,
  };
}

export default connect(mapStateToProps, null)(GamePage);
