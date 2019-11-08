import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draw from './draw';
import Guess from './guess';
import Vote from './vote';
import Results from './results';
import { withRouter } from "react-router-dom";

class GamePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gameState, history } = this.props;

    switch (gameState) {
      case 'draw':
        return <Draw />;
      case 'guess':
        return <Guess />;
      case 'select':
        return <Vote />;
      case 'gameEnd':
        return <Results />;
      default:
        return history.push('/');
    };
  }
}

const mapStateToProps = state => {
  return {
    gameState: state.game.gameStatus,
  };
}

export default withRouter(connect(mapStateToProps, null)(GamePage));
