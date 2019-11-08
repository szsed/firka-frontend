import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography, Button, Avatar, Chip } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Akos from '../images/avatars/Akos.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startGameAction } from '../store/actions';

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
    console.log('elindul a játék');
    // props.startGameAction();
  };

  // render() {
  //   const { classes } = this.props;
  //   return (
  //     <Fragment>
  //       <CssBaseline />
  //       <Navbar />
  //       <Container maxWidth="sm">
  //         <Paper className={classes.paper}>
  //           <Typography color="secondary" className={classes.title}>Játék neve</Typography>
  //           <Typography color="primary">Várjunk meg mindenkit!</Typography>
  //           <Typography color="primary" paragraph>Ők már csatlakoztak:</Typography>
  //           <div className={classes.players}>
  //             {/* {for (let i= 0; i < props.user.length; i++) } */}
  //             <Chip
  //             // avatar={<Avatar alt={props.user[i].name} src={props.user[i].img} />}
  //             // label={props.user[i].name}
  //             />
  //           </div>
  //           <Button onClick={this.handleSubmit} className={classes.button} fullWidth variant="contained" color="secondary">
  //             Játék indítása
  //           </Button>
  //         </Paper>
  //       </Container>
  //     </Fragment>
  //   );
  // }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapActionsToProps = {
  startGame: startGameAction,
};

Lobby.propTypes = {
  startGame: PropTypes.func,
  user: PropTypes.array,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles)(Lobby));
