import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WelcomePage from './pages/welcome';
import AccountPage from './pages/account';
import Dashboard from './pages/dashboard';
import Leaderboard from './pages/leaderboard';

const isLoggedin = false;

function App() {
  return (
    <Router>
      <Route exact path="/account" component={AccountPage} />
      {isLoggedin ? (
        <Route exact path="/" component={Dashboard} />
      ) : (
          <Route exact path="/" component={WelcomePage} />
        )}
      <Route exact path="/leaderboard" component={Leaderboard} />
    </Router>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));

