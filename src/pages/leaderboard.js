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
const rows = [
  'India', 'IN', 1324171354,
];

const columns = [
  { id: 'avatar', label: 'Profil', minWidth: 170, align: 'center', },
  { id: 'username', label: 'Felhasználó', minWidth: 100 },
  { id: 'victories', label: 'Pontszám', minWidth: 170, align: 'center' },
];

const fillRows = (parsed) => {
  return parsed.map(userData => ({
    avatar: userData.avatar,
    username: userData.username,
    victories: userData.victories,
  }))
}

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

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
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
                  {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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