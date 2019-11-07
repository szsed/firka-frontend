import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import GestureRoundedIcon from '@material-ui/icons/GestureRounded';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import Logo from '../images/logo.png';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(4)
  },
  title: {
    fontSize: 24,
    margin: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      fontSize: 28
    }
  },
  avatar: {
    width: 70,
    height: 70
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up("md")]: {
      width: '90%',
      justifyContent: 'space-around',
      margin: theme.spacing(8, 2),
    }
  },
  icon: {
    fontSize: 50,
  }
});

class WelcomePage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <img alt="logo" src={Logo} style={{ width: "95%" }} />
            <div className={classes.boxContainer}>
              <div className={classes.box}>
                <GestureRoundedIcon className={classes.icon} />
                <Typography color="secondary" className={classes.boxText}>Rajzolj!</Typography>
              </div>
              <div className={classes.box}>
                <ContactSupportRoundedIcon className={classes.icon} />
                <Typography color="secondary" className={classes.boxText}>Tippelj!</Typography>
              </div>
              <div className={classes.box}>
                <EmojiEmotionsRoundedIcon className={classes.icon} />
                <Typography color="secondary" className={classes.boxText}>Nevess!</Typography>
              </div>
            </div>
            <Typography>Regisztrálj, vagy jelentkezz be a játékhoz!</Typography>
            <Button
              href="/register"
              color="secondary"
              className={classes.button}
              variant="contained"
              fullWidth
            >
              Regisztráció
            </Button>
            <Button href="/login" fullWidth>Bejelentjezés</Button>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(WelcomePage);
