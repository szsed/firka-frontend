/* import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Paper } from "@material-ui/core";
import { requestToAPI } from "../services/backend-api-services";

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

const getUserData = () => {
  return requestToAPI('/users', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(parsed => {
      if (parsed.message) throw parsed;
      return fillRows(parsed)
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
}

const fillRows = (parsed) => {
  return parsed.map(userData => ({
    avatar: userData.avatar,
    username: userData.username,
    victories: userData.victories,
  }))
}

class Scoreboard extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      rows: '',
    };
  };

  componentDidMount() {
    getUserData()
      .then(rows => {
        this.setState({
          rows
        })
      })
  }

  render() {
    const { classes, game } = this.props;
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography paragraph variant="h4">
              Eredmények
            </Typography>
            {this.state.rows.map(element => {
              return (
                <Paper className={classes.boardItem}>
                  <div className={classes.boardDiv}>
                    <Avatar src={element.avatar} />
                    <Typography className={classes.boardName}>{element.username}</Typography>
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


Scoreboard.propTypes = {
  game: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      score: PropTypes.number,
      avatar: PropTypes.string,
    })
  )
};

export default connect(mapStateToProps)(withStyles(useStyles)(Scoreboard));


 */
import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container, Paper, Typography, Button, Avatar, TextField, Chip } from '@material-ui/core';
import { withStyles, makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { requestToAPI } from "../services/backend-api-services";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: 'relative',
    padding: theme.spacing(4),
  },
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

function createData(avatar, username, victories) {
  return { avatar, username, victories };
}

const rows = [
createData('👤', 'alfonz', 25),
createData('👤', 'D.Dani', 20),
createData('👤', 'Szabi', 21),
createData('👤', 'Ági', 12),
createData('👤', 'Pascal', 13),
createData('👤', 'N.Dani', 10),
createData('👤', 'Ákos', 9)
];

const columns = [
  { id: 'avatar', label: 'Profil', minWidth: 170, align: 'center', },
  { id: 'username', label: 'Felhasználó', minWidth: 100 },
  { id: 'victories', label: 'Pontszám', minWidth: 170, align: 'center' },
];

/* const fillRows = (parsed) => {
  return parsed.map(userData => ({
    avatar: userData.avatar,
    username: userData.username,
    victories: userData.victories,
  }))
} */

const getUserData = () => {
  return requestToAPI('/users', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(parsed => {
      if (parsed.message) throw parsed;
      return parsed
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
}

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
      page: 0,
      rowsPerPage: 10,
    };
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: +event.target.value,
    });
  };

  componentDidMount() {
    getUserData()
      .then(rows => {
        this.setState({
          rows
        })
      })
  }

  render() {
    const { classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <div className={classes.tableWrapper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Előző oldal',
              }}
              nextIconButtonProps={{
                'aria-label': 'Következő oldal',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Leaderboard);