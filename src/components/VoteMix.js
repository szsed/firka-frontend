import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardMedia, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { sendChoiceAction } from '../store/actions'

const timeToChange = 10000;

class VoteMix extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.currentImgSource = this.props.images[0].source
    setTimeout(this.props.sendChoice(this.state.tip), timeToChange)
  }

  selector = (array) => {
    if (this.props.game.players[this.props.round] !== this.props.user) {
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">Na vajon melyik a jo?</FormLabel>
          <RadioGroup defaultValue={array[0].text} aria-label="choices" name="customized-radios" onChange={this.handleChange}>
            {array.forEach(element => {
              return (<FormControlLabel value={element.text} control={<Radio />} label={element.text} />)
            })}
          </RadioGroup>
        </FormControl>
      )
    } else {
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">Na vajon melyik a jo?</FormLabel>
          <RadioGroup defaultValue={array[0].text} aria-label="choices" name="customized-radios">
            {array.forEach(element => {
              return (<FormControlLabel value="disabled" disabled control={<Radio />} label={element.text} />)
            })}
          </RadioGroup>
        </FormControl>
      )
    }
  }



  render() {
    return (
      <>
        <CardMedia src={this.props.game.players[this.props.round].drawing} />
        {this.selector()}
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
  sendChoice: sendChoiceAction,
}

VoteMix.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      drawing: PropTypes.string,
    })
  ),
  user: PropTypes.string,
  round: PropTypes.number,
  sendChoice: PropTypes.func,

};

export default connect(mapStateToProps, mapActionsToProps)(VoteMix)