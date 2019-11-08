import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CssBaseline, Container, Paper, Typography, CardMedia, TextField, withWidth } from '@material-ui/core';
import Navbar from '../components/Navbar';
import { withStyles } from "@material-ui/core/styles";

const timeToUpload = 11000;

const useStyles = theme => ({
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
  }

  componentDidMount() {
    // setTimeout(this.uploadImage, timeToUpload);
  }

  addField = () => {
    const {game, round, userId, classes } = this.props;
    if (game.players[round - 1].id !== userId) {
      return (
        <>
          <TextField type="text" id="tip" />
        </>
      )
    } else {
      return <Typography color="secondary" className={classes.title}>Várj amíg a többiek tippelnek!</Typography>
    }
  }

  render() {
    const { classes, game, round } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Typography color="secondary" className={classes.title}>Mi van a képen?</Typography>
          <Typography color="error" className={classes.title}>10s</Typography>
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
  userId: user.playerDetails.id,
  round: game.roundCounter,
});

Guess.propTypes = {
  user: PropTypes.string,
  time: PropTypes.number,
  uploadImage: PropTypes.func,
};

export default connect(mapStateToProps, null)(withStyles(useStyles)(withWidth()(Guess)));
