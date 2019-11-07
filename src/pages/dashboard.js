import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography, Button, Avatar, TextField, Chip } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Akos from '../images/avatars/Akos.png';
import { connect } from 'react-redux';
import { testGameList } from '../constants/test-game';

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


  handleClick = (game) => {
    console.log('csatlakoztam a szobához');
    console.log(game);
  };

  handleChange = (e) => {
    this.setState({
      newGame: e.target.value,
    });
  };

  handleSubmit = () => {
    console.log(this.state.newGame);
    // TODO: hozz létre szobát, és irányítsd oda!
  };

  render() {
    const { classes, gameList } = this.props;
    const { newGame } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <Avatar
              className={classes.avatar}
              src={Akos}
            />
            <Typography className={classes.title}>Szervusz Ákos!</Typography>
            <Typography paragraph>Csatlakozz egy meglévő játékhoz:</Typography>
            <div className={classes.games}>
              {testGameList.map(game => (
                <Chip
                  avatar={<Avatar alt="Natacha" src={Akos} />}
                  label={game.name}
                  onClick={() => this.handleClick(game)}
                  key={game.id}
                />
              ))}
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

const mapStateToProps = state => {
  return {
    gameList: state.gameList,
  };
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(Dashboard));
