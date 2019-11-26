import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import WelcomePage from '../pages/welcome';
import AccountPage from '../pages/account';
import Dashboard from '../pages/dashboard';
import Leaderboard from '../pages/leaderboard';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import LobbyPage from '../pages/lobby';
import GamePage from '../pages/game';
import { loginWithJWTOnLoad } from '../models/user-model';

class App extends Component {
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
        <Route exact path="/" component={userData ? Dashboard : WelcomePage} />
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

export default connect(mapStateToProps, null)(App);