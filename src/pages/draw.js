import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { CssBaseline, Container, Paper, Typography, Button, withWidth } from '@material-ui/core';
import Navbar from '../components/Navbar';
import { withStyles } from "@material-ui/core/styles";
import { sendDrawingAction, changeGameStatusAction } from '../store/actions';

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

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 10,
    };
  }

  componentDidMount() {
    setTimeout(this.uploadImage, timeToUpload);
    // setInterval(this.setState({ timeLeft: this.state.timeLeft - 1 }), 1000);
  }

  uploadImage = () => {
    let canvasData = document.querySelector('#canvas').toDataURL();
    this.props.sendDrawing(canvasData);
  }

  componentDidUpdate() {
    const { game, changeGameStatus } = this.props;
    if (!game) return;
    const drawingCount = game.players.filter(player => player.drawing).length;
    // if (drawingcount === 3) changeGameStatus('guess');
    if (drawingCount === 1) changeGameStatus('guess');
  }

  render() {
    const { classes, width } = this.props;
    const { timeLeft } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Typography color="primary" className={classes.paragraph} paragraph>Rajzold le a következőt:</Typography>
          <Typography color="secondary" className={classes.title}>Kutyámajom</Typography>
          <Typography color="error" className={classes.title}>{timeLeft}s</Typography>
          <div className={classes.paperContainer}>
            <Paper className={classes.paper}>
              {width === 'xs' ? (
                <Canvas width={280} height={250} />
              ) : (
                  <Canvas width={536} height={500} />
                )}
            </Paper>
          </div>
          <Button onClick={this.handleSubmit} className={classes.button} fullWidth variant="contained" color="secondary">
            Kész!
            </Button>
        </Container>
      </Fragment>
    )
  }

}

const mapStateToProps = state => ({
  game: state.game.gameStats,
});

const mapActionsToProps = {
  sendDrawing: sendDrawingAction,
  changeGameStatus: changeGameStatusAction,
}

Draw.propTypes = {
  user: PropTypes.string,
  time: PropTypes.number,
  uploadImage: PropTypes.func,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(withWidth()(Draw)));
