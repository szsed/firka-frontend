import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { sendImageToFirestore } from '../services/firebase/firebase-services';
import { CssBaseline, Container, Paper, Typography, Button, withWidth } from '@material-ui/core';
import Navbar from '../components/Navbar';
import { withStyles } from "@material-ui/core/styles";
import { sendDrawingAction } from '../store/actions';

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

  componentDidMount() {
    setTimeout(this.uploadImage, timeToUpload);
  }

  uploadImage = () => {
    let canvasData = document.querySelector('#canvas').toDataURL();
    console.log(canvasData)
    this.props.sendDrawing(canvasData);
  }

  render() {
    const { classes, width } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Typography color="primary" className={classes.paragraph} paragraph>Rajzold le a következőt:</Typography>
          <Typography color="secondary" className={classes.title}>Kutyámajom</Typography>
          <Typography color="error" className={classes.title}>10s</Typography>
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

const mapStateToProps = ({ user_id }) => ({
  user: user_id,
});

const mapActionsToProps = {
  sendDrawing: sendDrawingAction
}

Draw.propTypes = {
  user: PropTypes.string,
  time: PropTypes.number,
  uploadImage: PropTypes.func,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(withWidth()(Draw)));
