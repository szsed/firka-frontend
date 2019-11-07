import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField, CardMedia } from '@material-ui/core';
import { changeGameAction } from '../store/'

const timeToChange = 10000;

class TippMix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips =[]
    }
  }

  componentDidMount() {
    let guess = document.querySelector('#tip')
    setTimeout(sendGuessAction(guess), timeToChange)
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
  changeGame: changeGameAction,
}

Display.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      source: PropTypes.string,
    })
  ),
};

export default connect(mapStateToProps, mapActionsToProps)(TippMix)