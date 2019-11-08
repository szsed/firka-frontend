import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography, Button, Avatar, Chip } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { startGameAction, changeGameStatusAction } from '../store/actions';

const useStyles = theme => ({
  players: {
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
      marginBottom: theme.spacing(8),
    }
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
  },
});

class Lobby extends Component {

  handleSubmit = () => {
    this.props.startGame();
    this.props.history.push('/game');
  };

  componentDidUpdate() {
    if (!this.props.gameStats) return;
    if (this.props.gameStats.status === 'inprogress') this.props.changeGameStatus('draw');
  }

  render() {
    const { classes, gameStats, currentGame } = this.props;
    if (!gameStats) return null;
    const userList = gameStats.players;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <Typography color="secondary" className={classes.title}>{currentGame.name}</Typography>
            <Typography color="primary">Várjunk meg mindenkit!</Typography>
            <Typography color="primary" paragraph>Ők már csatlakoztak:</Typography>
            <div className={classes.players}>
              {userList ? userList.map(user => {
                return (<Chip
                  avatar={<Avatar alt={user.username} src={user.avatar} />}
                  label={user.username}
                  key={user.id}
                />)
              }) : null}
            </div>
            <Button onClick={this.handleSubmit} className={classes.button} fullWidth variant="contained" color="secondary">
              Játék indítása
            </Button>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  gameStats: state.game.gameStats,
  currentGame: state.game.gameStats
});

const mapActionsToProps = {
  startGame: startGameAction,
  changeGameStatus: changeGameStatusAction,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(Lobby));
