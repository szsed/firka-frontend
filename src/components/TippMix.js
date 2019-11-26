import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField, CardMedia } from '@material-ui/core';
import { sendGuessAction } from '../store/actions'

const timeToChange = 10000;

class TippMix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: "",
    };
  }

  componentDidMount() {
    let guess = document.querySelector('#tip')
    const sendGuess = () => this.props.sendGuess(guess.textContent);
    setTimeout(sendGuess, timeToChange);
  }

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  addField = () => {
    if (this.props.game.players[this.props.round - 1].id !== this.props.userId) {
      return (
        <>
          <TextField
            type="text"
            id="tip"
            helperText="Mit ábrázol a kép? Írd ide!"
            variant="outlined"
            onChange={this.handleChange} />
          <Button>Nyomjad, ha megvan!</Button>
        </>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <>
        <CardMedia src={this.props.game.players[this.props.round - 1].drawing} />
        {this.addField()}
      </>
    );
  }
}

const mapStateToProps = ({ game, user, }) => ({
  game: game.gameStats,
  userId: user.id,
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

export default connect(mapStateToProps, mapActionsToProps)(TippMix);
