import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Countdown from '../components/Countdown';
import { CssBaseline, Container, Paper, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import { startNextRoundAction, endGameAction } from '../redux/actions/current-game-actions';

const timeToChange = 10000;

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(4),
    position: 'relative',
  },
  title: {
    fontSize: 24,
    margin: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      fontSize: 28,
      marginBottom: theme.spacing(8),
    }
  },
});

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const { round, game, startNextRound, endGame } = this.props;
    setTimeout(() => round < game.players.length - 1 ? startNextRound() : endGame(), timeToChange);
  }

  componentDidUpdate() {
    // const { game, changeGameStatus, round } = this.props;
    // if (!game) return;
    // const guessCount = game.players.filter(player => {
    //   return player.guesses.length === round;
    // }).length;
    // const numOfPlayers = game.players.length;
    // if (guessCount === numOfPlayers) changeGameStatus('select');
  }

  selector = () => {
    const { game, round, user } = this.props;
    if (game.players[round].id !== user.id) {
      return (
        <FormControl component="fieldset" >
          <FormLabel component="legend">Na vajon melyik a jó?</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange}>
            {game.players.map(player => (
              <FormControlLabel value={player.guesses[round]} control={<Radio />} label={player.guesses[round]} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    } else {
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">Most várj, ez a Te képed :)</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange}>
            {game.players.map(player => (
              <FormControlLabel value={player.guesses[round]} disabled control={<Radio />} label={player.guesses[round]} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { classes, game, round } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Typography color="secondary" className={classes.title}>Szavazás</Typography>
          <Typography color="error" className={classes.title}><Countdown /></Typography>
          <Paper className={classes.paper}>
            <img width="100%" alt="drawing" src={game.players[round].drawing} />
            {this.selector()}
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ game, user, }) => ({
  game: game.gameData,
  user,
  round: game.roundCounter,
});

const mapActionsToProps = {
  // sendChoice: sendChoiceAction,
  startNextRound: startNextRoundAction,
  endGame: endGameAction,
}

Vote.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(Vote));
