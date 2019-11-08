import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WelcomePage from './pages/welcome';
import AccountPage from './pages/account';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/results';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import LobbyPage from './pages/lobby';
import GamePage from './pages/game';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey, orange } from "@material-ui/core/colors";
import { Provider, connect } from 'react-redux';
import store from './store/store';
import { loginWithJWTOnLoad } from './models/user-model';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[700]
    },
    secondary: {
      main: orange[400]
    },
    background: {
      default: "#E5E5E5"
    }
  },
  typography: {
    fontFamily: "'McLaren', 'cursive'"
  },
  shape: {
    borderRadius: 6
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    loginWithJWTOnLoad();
  }

  render() {
    const { userData } = this.props;
    return (
      <Router>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/account" component={AccountPage} />
        {!userData ? (
          <Route exact path="/" component={WelcomePage} />
        ) : (
            <Route exact path="/" component={Dashboard} />
          )}
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/lobby" component={LobbyPage} />
        <Route exact path="/game" component={GamePage} />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
}

const AppWithRedux = connect(mapStateToProps, null)(App);
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppWithRedux />
    </ThemeProvider>
  </Provider>, document.getElementById('root'));
