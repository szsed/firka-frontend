import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import store from '../store/store';
import { nextRoundAction } from '../store/actions';

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
    setTimeout(() => {
      store.dispatch(nextRoundAction())
    }, timeToChange)
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

  selector = (guesses) => {
    if (this.props.game.players[this.props.round - 1].id !== this.props.user.playerDetails.id) {
      return (
        <FormControl component="fieldset" >
          <FormLabel component="legend">Na vajon melyik a jó?</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange}>
            {this.props.game.players.map(player => (
              <FormControlLabel value={player.guesses[this.props.round - 1]} control={<Radio />} label={player.guesses[this.props.round - 1]} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    } else {
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">Most várj, ez a Te képed :)</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={this.props.value} onChange={this.handleChange}>
            {this.props.game.players.map(player => (
              <FormControlLabel value={player.guesses[this.props.round - 1]} disabled control={<Radio />} label={player.guesses[this.props.round - 1]} />
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
    const { classes, game, user, round } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <Typography color="secondary" className={classes.title}>Szavazás</Typography>
            <img width="100%" alt="drawing" src={game.players[round - 1].drawing} />
            {this.selector()}
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ game, user, }) => ({
  game: game.gameStats,
  user,
  round: game.roundCounter,
});

// const mapActionsToProps = {
//   sendChoice: sendChoiceAction,
// }

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

export default connect(mapStateToProps, null)(withStyles(useStyles)(Vote));
