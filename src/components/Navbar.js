import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, IconButton, MenuItem, Menu, Link } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import Logo_white from '../images/logo_white.png';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logoutUser } from "../models/user-model";


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  button: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1, 4)
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  logo: {
    width: 80
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { userData } = props;

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logoutUser();
    props.history.push('/login');
  }


  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!userData ? (
        <div>
          <Link underline="none" color="inherit" href="/login">
            <MenuItem>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <LockOpenRoundedIcon />
              </IconButton>
              <p>Bejelentkezés</p>
            </MenuItem>
          </Link>
          <Link underline="none" color="inherit" href="/register">
            <MenuItem>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <EmojiPeopleRoundedIcon />
              </IconButton>
              <p>Regisztráció</p>
            </MenuItem>
          </Link>
        </div>
      ) : (
          <div>
            <Link underline="none" color="inherit" href="/account">
              <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <AccountCircleRoundedIcon />
                </IconButton>
                <p>Fiókom</p>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <ExitToAppRoundedIcon />
              </IconButton>
              <p>Kijelentkezés</p>
            </MenuItem>
          </div>
        )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <a href="/">
            <img className={classes.logo} alt="logo" src={Logo_white} />
          </a>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!userData ? (

              <div>
                <Button href="/login" className={classes.button} color="inherit">
                  Bejelentkezés
                </Button>
                <Button
                  href="/register"
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                >
                  Regisztráció
                </Button>
              </div>
            ) : (
                <div>
                  <Button href="/account" startIcon={<AccountCircleRoundedIcon />} className={classes.button} color="inherit">
                    Fiókom
                  </Button>
                  <Button onClick={handleLogout} startIcon={<ExitToAppRoundedIcon />} className={classes.button} color="inherit"
                  >
                    Kijelentkezés
                  </Button>
                </div>
              )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {/* TODO: user Avatar photo here? */}
              <AccountCircleRoundedIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(Navbar));
