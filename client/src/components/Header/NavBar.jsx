import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { SetAppTheme } from '../../redux/actions/ui';
import { logout } from '../../redux/actions/auth';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontSize: 15,
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  AppBarButton: {
    textTransform: 'none',
    fontWeight: 'bold',
  },
  Avatar: {
    width: '25px',
    height: '25px',
  },
}));

function PrimaryAppBar(props) {

  const { currentUser, isAuthenticated, logout, 
    darkModeOn, toggleDarkMode } = {...props}
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = e => setAnchorEl(e.currentTarget);

  const handleMobileMenuOpen = e => setMobileMoreAnchorEl(e.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    if(isAuthenticated){
      logout();
      // we setAnchorEl(null) to avoid the menu being open
      // after a login
      setAnchorEl(null);
      history.push('/');
    }
  }

  const handleThemeChange = e => {
    if(e.target.checked) toggleDarkMode({theme:'dark', darkModeOn:true});
    else toggleDarkMode({theme:'light', darkModeOn:false});
  }

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem component={RouterLink} 
        to={`/${currentUser.user?.username}/profile`}
        onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>

      <MenuItem>
        <IconButton 
          aria-label="Home" 
          component={RouterLink} 
          to="/" 
          color="inherit">
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      {isAuthenticated 
        ?
        [
          <MenuItem key="users">
            <IconButton 
              aria-label="show users" 
              component={RouterLink} 
              to="/users" 
              color="inherit">
              <PeopleIcon />
            </IconButton>
            <p>Users</p>
          </MenuItem>,

          <MenuItem key="profileMenu" onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}>
              <Avatar src={currentUser.user.links.avatar} 
                alt={currentUser.user.username}> {currentUser.user.username[0]} 
              </Avatar>
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          ]
        :
          <MenuItem key="login">
            <IconButton 
              aria-label="Login" 
              component={RouterLink} 
              to="/auth/signin" 
              color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>
      }
      <MenuItem key="darkMode">
            <Switch
              checked={darkModeOn}
              color="secondary"
              onChange={handleThemeChange}
              name="theme"
              icon={<Brightness4Icon />}
              inputProps={{ 'aria-label': 'set them (default: light)' }}
            />
        <p>Dark mode</p>
      </MenuItem>

    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense" color="primary">
          <Typography variant="h4" noWrap>
              <Button 
                component={RouterLink} 
                color="inherit" 
                variant="text"
                className={classes.title}
                to="/">
                  Snippets
              </Button>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button component={RouterLink} 
              color="inherit" 
              className={classes.AppBarButton} 
              to="/">
              Home
            </Button>

            <Button component={RouterLink} 
              color="inherit" 
              className={classes.AppBarButton} 
              to="/snippets">
              Snippets
            </Button>

            <Switch
              checked={darkModeOn}
              color="secondary"
              onChange={handleThemeChange}
              name="theme"
              icon={<Brightness4Icon />}
              inputProps={{ 'aria-label': 'set them (default: light)' }}
            />

            {isAuthenticated 
              ?
              <React.Fragment>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <Avatar src={currentUser.user.links.avatar} 
                    className={classes.Avatar}
                    alt={currentUser.user.username}> {currentUser.user.username[0]} 
                  </Avatar>
                </IconButton>
              </React.Fragment>
              :
              <React.Fragment>
                <IconButton 
                  aria-label="Login" 
                  component={RouterLink} 
                  to="/auth/signin" 
                  color="inherit">
                  <ExitToAppIcon />
                </IconButton>
              </React.Fragment>
            }
          </div>
          <div className={classes.sectionMobile}>

            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>

          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      {isAuthenticated &&
        renderMenu
      }

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    isAuthenticated: state.auth.currentUser.authenticated,
    darkModeOn: state.ui.darkModeOn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  toggleDarkMode: (payload) => dispatch(SetAppTheme(payload)),
  logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAppBar);