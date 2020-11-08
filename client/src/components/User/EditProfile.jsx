import React, { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Dialogx from '../Common/Dialog';
import PropTypes from 'prop-types';
import { updateUserProfile } from '../../services/putData';


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  errors: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const EditProfile = (props) => {

  const { isAuthenticated, currentUser, reloadUser } = {...props};
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleKeyDown = async event => {
    if(event.key === 'Enter' && isEnabledToSubmit && !isLoading) performUpdate(event);
  }

  const redirect = useCallback((where) => history.push(where)
  , [history]
  );

  useEffect(() => {
    if(!isAuthenticated) redirect('/');
    else{
      setUsername(currentUser.username);
      setAbout(currentUser.about_me);
    }
  }, [isAuthenticated, currentUser, redirect]);

  const performUpdate = async event => {
    event.preventDefault();
    if(isEnabledToSubmit && !isLoading) {
      setSuccess(false);
      setIsError(false);
      setIsLoading(true);
      setIsLoaded(false);
      try {
        const result = await updateUserProfile({username, about});
        setSuccess(result.data.message);
        reloadUser(currentUser.id);
      } catch (error) {
          if (error.response) {
            setIsError(true);
            setError(error.response?.data?.message || 
              error.response.statusText);
          }
          else if (error.request) {
            setIsError(true);
            setError(error.request?.data?.message || 
              error.request.statusText);
          }
      }
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const isEnabledToSubmit = () => {
    if(username && username.length >= 4 && about &&
      about.length >= 10) return true;
    else return false;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={0}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ margin: 5 }}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={({ target: { value } }) => setUsername(value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ margin: 5 }}
                  required
                  fullWidth
                  id="about"
                  label="About"
                  name="about"
                  value={about}
                  onChange={({ target: { value } }) => setAbout(value)}
                  autoComplete="about"
                />
              </Grid>
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={performUpdate}
              onKeyDown={handleKeyDown}
              disabled={!isEnabledToSubmit()}
              color="secondary"
              className={classes.submit}
            >
              Save changes
            </Button>
            {isError && 
              <Dialogx
                title={"Error"}
                body={error}
                actionName={"Okay"}
              />
            }
            {isLoaded && success && 
              <Dialogx
                title={"Success"}
                body={success}
                actionName={"Okay"}
              />
            }
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

EditProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateUserProfile: PropTypes.func.isRequired
};

export default EditProfile;
