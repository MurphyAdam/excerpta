import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import WiseRoute from './components/WiseRoute';
import './assets/styles/blog.css';
import { connect } from 'react-redux';
import { getCurrentUser } from './redux/actions/auth';
import Routes from './Routes';
import Notifications from 'react-notification-system-redux';
import config from './config/config';
import { changeDocumentTitle } from './util/methods';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(3 * 2))]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
}));

//Optional styling
const UINotificationsStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      margin: '5px 5px 2px 1px'
    },
  }
};

function App(props) {

  const { loadUser, isAuthenticated, ui, notifications } = {...props};
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: ui.theme,
      primary: config.defaultPaletteColors.primary,
      secondary: config.defaultPaletteColors.secondary,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      fontSize: 14,
    },
  });

  useEffect(() => {
    if(!isAuthenticated) loadUser();
    else changeDocumentTitle("Snippets: A Simple Code Snippets Manager")
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid component="main" className={classes.root}>
        <Router>
          <React.Fragment>
            <Header />
            <Notifications
              notifications={notifications}
              style={UINotificationsStyle}
            />
              <Switch>
                {Routes.map(route => (
                  <WiseRoute exact 
                    path={route.path} 
                    key={route.name} 
                    needsAuthentication={route.needsAuthentication} 
                    needsAuthorisation={route.needsAuthorisation}
                    component={route.component} />
                ))}
                <Redirect from="*" to="/http-status/404"/>
              </Switch>
          </React.Fragment>
        </Router>
      </Grid>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    isAuthenticated: state.auth.currentUser.authenticated,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  loadUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);