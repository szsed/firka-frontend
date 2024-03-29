import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography, Button, Avatar, TextField, Chip } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { addListOfGamesListenerAction, selectGameAction, createGameAction } from '../redux/actions/game-list-actions';
import { getRandomWords } from '../models/word-model';

const useStyles = theme => ({
  games: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    marginBottom: theme.spacing(6),
  },
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
      marginBottom: theme.spacing(4),
    }
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up("sm")]: {
      width: '90%',
      justifyContent: 'space-around',
      margin: theme.spacing(8, 2),
    }
  },
  icon: {
    fontSize: 50,
  },
  avatar: {
    width: 150,
    height: 150,
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: '',
    };
  };

  componentDidMount() {
    this.props.addListOfGamesListener();
  }

  handleClick = (game) => {
    const { selectGame, history } = this.props;
    selectGame(game.id);
    history.push('/lobby');
  };

  handleChange = (e) => {
    this.setState({
      newGame: e.target.value,
    });
  };

  handleSubmit = () => {
    const { user, createGame, history } = this.props;
    getRandomWords().then(words => {
      const userData = {
        ...user,
        guesses: [],
        word: words[0],
        score: 0,
        drawing: null,
      }
      const gameData = {
        name: this.state.newGame,
        status: 'lobby',
        words,
        players: [userData],
      }

      createGame(gameData);
      history.push('/lobby');
    });
  };

  render() {
    const { classes, gameList, user } = this.props;
    if (!user) return null;
    const { newGame } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <Avatar
              className={classes.avatar}
              src={user.avatar}
            />
            <Typography className={classes.title}>Szervusz {user.username}!</Typography>
            <Typography paragraph>Csatlakozz egy meglévő játékhoz:</Typography>
            <div className={classes.games}>
              {gameList ? gameList.map(game => {
                return (<Chip
                  key={game.id}
                  avatar={<Avatar alt="Natacha" src={game.players[0].avatar} />}
                  label={game.name}
                  onClick={() => this.handleClick(game)}
                />)
              }) : null}
            </div>
            <Typography paragraph>Vagy hozz létre egy új játékot:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Írd ide a játék nevét..."
              value={newGame}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit} className={classes.button} fullWidth variant="contained" color="primary">
              Gyerünk!
            </Button>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  gameList: state.lobby.openGames,
});

const mapActionsToProps = {
  addListOfGamesListener: addListOfGamesListenerAction,
  selectGame: selectGameAction,
  createGame: createGameAction,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(Dashboard));
