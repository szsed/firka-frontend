import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { CssBaseline, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUserChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  validate = event => {
    const { password, username } = this.state;
    if (event.target.type === "text") {
      this.setState({
        usernameError:
          username.length > 0 ? "" : "Felhasználónév megadása kötelező!"
      });
    }
    if (event.target.type === "password") {
      this.setState({
        passwordError: password.length > 0 ? "" : "Jelszó megadása kötelező!"
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('bejelentkeztem')
    /* const { username, password } = this.state;

    if (!username || !password) {
      return;
    }
    this.props.loginUser(username, password)
      .then(parsed => {
        localStorage.setItem('token', parsed);
        this.onLogin();
      })
      .catch(error => this.setState({ responseError: error.message })); */
  }

  render() {
    const { classes } = this.props;
    return (
        <Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Bejelentkezés
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Felhasználónév"
                  name="username"
                  type="text"
                  autoFocus
                  onChange={this.handleUserChange}
                  onBlur={event => this.validate(event)}
                  helperText={this.state.usernameError}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Jelszó"
                  type="password"
                  id="password"
                  onChange={this.handlePasswordChange}
                  onBlur={event => this.validate(event)}
                  helperText={this.state.passwordError}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!this.state.username || !this.state.password}
                >
                  Bejelentkezés
                </Button>
                <Grid container>
                  <Grid item>
                    <Link underline="always" href="/register" variant="body2">
                      {"Még nincs fiókod? Regisztrálj itt!"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
        </Container>
      </Fragment>
    );
  }
}

/* Login.propTypes = {
  loginUser: PropTypes.func,
};

const mapActionsToProps = {
  loginUser: loginUserAction,
}; */

export default /* connect(null, mapActionsToProps)( */withStyles(useStyles)(Login);