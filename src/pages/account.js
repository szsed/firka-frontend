import React, { Component, Fragment } from 'react';
import { CssBaseline, Container, Paper, Typography, Button, Avatar } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

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

class Account extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { classes, user } = this.props;
    if (!user) return null;
    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <Avatar
              className={classes.avatar}
              src={user.playerDetails.avatar}
            />
            <Typography className={classes.title}>{user.playerDetails.username}</Typography>
            <Button href="/leaderboard" className={classes.button} variant="contained" >Ranglista</Button>
            <Button href="/" className={classes.button} >Vissza a főoldalra</Button>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(useStyles)(Account));
