import React, { Component, Fragment } from 'react';
import { CssBaseline, Paper } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { registerUser } from '../models/user-model';

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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: ""
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
          username.length > 0 ? "" : "Válassz felhasználónevet!"
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
    const { username, password } = this.state;
    registerUser({ username, password })
      .then(parsed => {
        if (parsed.message) {
          this.setState({ responseError: 'Hiba történt, ellenőrizd az adataidat!' });
        } else {
          this.props.history.push("/");
        }
      })
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
              Regisztráció
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Válassz felhasználónevet!"
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
                label="Válassz jelszót!"
                type="password"
                id="password"
                onChange={this.handlePasswordChange}
                onBlur={event => this.validate(event)}
                helperText={this.state.passwordError || this.state.responseError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.state.username || !this.state.password}
              >
                Regisztrálok
              </Button>
              <label>{this.state.responseError}</label>
              <Grid container>
                <Grid item>
                  <Link underline="always" href="/login" variant="body2">
                    {"Már van fiókom, belépek!"}
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

/* Register.propTypes = {
  signupUser: PropTypes.func,
};

const mapActionsToProps = {
  signupUser: signupUserAction,
}; */

export default /* connect(null, mapActionsToProps)( */withStyles(useStyles)(Register);