import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField, CardMedia } from '@material-ui/core';
import { sendGuessAction } from '../store/actions'

const timeToChange = 10000;

class TippMix extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let guess = document.querySelector('#tip').textContent
    setTimeout(this.props.sendGuess(guess), timeToChange)
  }

  addField = () => {
    if (this.props.game.players[this.props.round] !== this.props.user) {
      return (
        <>
          <TextField type="text" id="tip" />
          <Button>Nyomjad ha megvan!</Button>
        </>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <>
        <CardMedia src={this.props.game.players[this.props.round].drawing} />
        {this.addField()}
      </>
    );
  }
}

const mapStateToProps = ({ game, user, }) => ({
  game: game.gameStats,
  user: user.id,
  round: game.roundCounter,
});

const mapActionsToProps = {
  sendGuess: sendGuessAction,
}

Display.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      drawing: PropTypes.string,
    })
  ),
  user: PropTypes.string,
  round: PropTypes.number,
  sendGuess: PropTypes.func,

};

export default connect(mapStateToProps, mapActionsToProps)(TippMix)