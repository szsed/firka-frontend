import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Paper } from "@material-ui/core";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(4)
  },
  title: {
    fontSize: 20,
    margin: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      fontSize: 28
    }
  },
  avatar: {
    width: 70,
    height: 70
  },
  boardItem: {
    width: "100%",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  boardDiv: {
    display: "flex",
    alignItems: "center"
  },
  boardName: {
    marginLeft: "10px"
  }
});

class Scoreboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container component="main" /* maxWidth="xs" */>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography paragraph variant="h4">
              Eredmeny tabla
            </Typography>
            {this.props.game.players.forEach(element => {
              return (
                <Paper className={classes.boardItem}>
                  <div className={classes.boardDiv}>
                    {/* <Avatar src={element.avatar} /> */}
                    <Typography className={classes.boardName}>{element.name}</Typography>
                  </div>
                  <Typography>{element.score}</Typography>
                </Paper>
              )
            })}
          </div>
        </Container>
      </>
    )
  }
}

const mapStateToProps = ({ game }) => ({
  game: game.gameStats,
});


Display.propTypes = {
  game: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      score: PropTypes.number,
      avatar: PropTypes.string,
    })
  )
};

export default connect(mapStateToProps)(withStyles(useStyles)(Scoreboard));
