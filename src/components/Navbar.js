import React, { Fragment } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Avatar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import Logo_white from '../images/logo_white.png';
import Logo from '../images/logo.png';
import Akos from '../images/avatars/Akos.png';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  button: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1, 4)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
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

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isLoggedIn = true;

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
      {isLoggedIn ? (
        <Fragment>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <AccountCircleRoundedIcon />
            </IconButton>
            <p>Fiókom</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <ExitToAppRoundedIcon />
            </IconButton>
            <p>Kijelentkezés</p>
          </MenuItem>
        </Fragment>
      ) : (
          <Fragment>
            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <LockOpenRoundedIcon />
              </IconButton>
              <p>Bejelentkezés</p>
            </MenuItem>
            <MenuItem>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <EmojiPeopleRoundedIcon />
              </IconButton>
              <p>Regisztráció</p>
            </MenuItem>
          </Fragment>
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
            <Button className={classes.button} color="inherit">
              Login
            </Button>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
            >
              Join
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircleRoundedIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
