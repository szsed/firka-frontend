import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from "@material-ui/core/Avatar";
import imagesArray from '../assets/images'
import { withStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class AvatarChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: '',
      setAnchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({ setAnchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ setAnchorEl: null });
  };

  render() {
    return (
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
          Válassz profilképet!
      </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {imagesArray.forEach(element => {
            return (
              <StyledMenuItem>
                <ListItemIcon>
                  <Avatar src={element.path} onChange={this.props.function} />
                </ListItemIcon>
              </StyledMenuItem>
            )
          })}
        </StyledMenu>
      </div >
    );
  }
}

export default withStyles(AvatarChooser);