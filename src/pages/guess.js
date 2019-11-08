import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CssBaseline, Container, Paper, Typography, CardMedia, TextField, withWidth } from '@material-ui/core';
import Navbar from '../components/Navbar';
import { withStyles } from "@material-ui/core/styles";
import { sendGuessAction, changeGameStatusAction } from '../store/actions';
import Countdown from '../components/Countdown';

const timeToUpload = 10000;

const useStyles = theme => ({
  textField: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(4),
    width: 310,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "absolute"
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: 'relative',
  },
  title: {
    fontSize: 24,
    margin: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      fontSize: 32,
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
    },
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
  },
  paragraph: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  paperContainer: {
    margin: '0 auto',
    width: 536,
    [theme.breakpoints.down("xs")]: {
      width: 280,
    },
  },
});

class Guess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: "",
    };
  }

  componentDidMount() {
    setTimeout(this.uploadGuess, timeToUpload);
  }

  handleChange = event => {
    this.setState({ guess: event.target.value });
  };

  uploadGuess = () => {
    const { user, game } = this.props;
    const userId = user.playerDetails.id;
    const userIndex = game.players.findIndex(player => player.id === userId);
    setTimeout(() => this.props.sendGuess(this.state.guess), userIndex * 500);
  }

  componentDidUpdate() {
    const { game, changeGameStatus, round } = this.props;
    if (!game) return;
    const guessCount = game.players.filter(player => {
      console.log(round, player.guesses)
      return player.guesses.length === round;
    }).length;
    const numOfPlayers = game.players.length;
    console.log(guessCount, numOfPlayers)
    if (guessCount === numOfPlayers) changeGameStatus('select');
  }

  addField = () => {
    const { game, round, user, classes } = this.props;
    if (game.players[round - 1].id !== user.playerDetails.id) {
      return (
        <>
          <TextField
            className={classes.textField}
            type="text"
            id="tip"
            id="outlined-basic"
            helperText="Mit ábrázol a kép? Írd ide!"
            variant="outlined"
            onChange={this.handleChange}
          ></TextField>
        </>
      )
    } else {
      return <Typography color="secondary" className={classes.title}>Várj amíg a többiek tippelnek!</Typography>
    }
  }

  render() {
    const { classes, game, round } = this.props;
    if (!game) return null;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Typography color="secondary" className={classes.title}>Mi van a képen?</Typography>
          <Typography color="error" className={classes.title}><Countdown /></Typography>
          <div className={classes.paperContainer}>
            <Paper className={classes.paper}>
              <img src={game.players[round - 1].drawing} />
            </Paper>
          </div>
          {this.addField()}
        </Container>
      </Fragment>
    )
  }

}

const mapStateToProps = ({ game, user }) => ({
  game: game.gameStats,
  user,
  round: game.roundCounter,
});

Guess.propTypes = {
  user: PropTypes.string,
  time: PropTypes.number,
  uploadImage: PropTypes.func,
};

const mapActionsToProps = {
  sendGuess: sendGuessAction,
  changeGameStatus: changeGameStatusAction,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(withWidth()(Guess)));