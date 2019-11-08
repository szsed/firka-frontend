import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendImageToFirestore } from '../services/firebase/firebase-services';
import { CssBaseline, Container, Paper, Typography, Button, Avatar, Chip, withWidth } from '@material-ui/core';
import Navbar from '../components/Navbar';
import { withStyles } from "@material-ui/core/styles";
import { calculateString } from 'bytebuffer';
import Countdown from '../components/Countdown';

const timeToUpload = 10000;

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
    setTimeout(this.uploadImage, timeToUpload);
  }

  uploadImage = () => {
    let canvasData = document.querySelector('#canvas').toDataURL();
    sendImageToFirestore(this.props.userId, canvasData);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Typography color="secondary" className={classes.title}>Mi van a képen?</Typography>
          <Typography color="error" className={classes.title}><Countdown /></Typography>
          <div className={classes.paperContainer}>
            <Paper className={classes.paper}>
              <h3>kép helye</h3>
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

const mapStateToProps = ({ user }) => ({
  userId: user.playerDetails.id,
});

Guess.propTypes = {
  user: PropTypes.string,
  time: PropTypes.number,
  uploadImage: PropTypes.func,
};

export default connect(mapStateToProps, null)(withStyles(useStyles)(withWidth()(Guess)));
