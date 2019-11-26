import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blueGrey, orange } from "@material-ui/core/colors";
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';

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

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>, document.getElementById('root'));
