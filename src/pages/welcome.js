import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { CssBaseline, Container } from '@material-ui/core';

class WelcomePage extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="sm">
        </Container>
      </Fragment>
    );
  }
}

export default WelcomePage;
