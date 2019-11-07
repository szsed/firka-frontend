import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography, Button, Avatar, Chip } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Akos from '../images/avatars/Akos.png';

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
  constructor(props) {
    super(props);
  };

  handleSubmit = () => {
    console.log('elindul a játék');
    // TODO: indítsd el a játékot!
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <Typography color="secondary" className={classes.title}>Játék neve</Typography>
            <Typography color="primary">Várjunk meg mindenkit!</Typography>
            <Typography color="primary" paragraph>Ők már csatlakoztak:</Typography>
            <div className={classes.players}>
              <Chip
                avatar={<Avatar alt="Akos" src={Akos} />}
                label="Ákos"
              />
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

export default withStyles(useStyles)(Lobby);
