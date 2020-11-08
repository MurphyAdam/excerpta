import React from 'react';
import moment from 'moment';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { BackButton } from '../Common/BackButton';
import PropTypes from 'prop-types';
 
const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  about: {
    marginTop: theme.spacing(1),
  },
  icon: {
    marginLeft: theme.spacing(1),
    width: 20,
    height: 20,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    textAlignLast: 'center',
    marginBottom: theme.spacing(1),
  }
}));

function CurrentUserCard(props) {

  const { currentUser, loadEditProfile, reloadUser } = {...props};
  const classes = useStyles();

  const refresh = () => reloadUser(currentUser.id);

  return (
    <React.Fragment>
        <BackButton />
        <IconButton 
          className={classes.icons}>
          <AutorenewIcon onClick={refresh} title="Refresh Profile"/>
        </IconButton>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.avatarContainer}>
              <Avatar src={currentUser._links.avatar} 
                aria-label={currentUser.username} 
                className={classes.avatar} />
            </div>
            <Typography component="h4" 
              variant="h4" 
              align="center" 
              color="textPrimary" 
              gutterBottom>
              @{currentUser.username}
            </Typography>
            <Breadcrumbs separator="-" 
              className={classes.breadcrumb} 
              aria-label="User Meta">
              <Typography variant="subtitle2" 
                color="inherit" 
                noWrap>
                Followers {currentUser.followers_count}
                <PeopleIcon className={classes.icon} />
              </Typography>
              <Typography variant="subtitle2" 
                color="inherit" 
                noWrap>
                Active { moment(currentUser.last_seen).fromNow() } ago
                <TodayIcon className={classes.icon} />
              </Typography>
            </Breadcrumbs>
            {currentUser.about_me
              ? 
              <Typography variant="body1" 
                className={classes.about} 
                color="textSecondary" 
                paragraph>
                {currentUser.about_me}
              </Typography>
              : 
              <Typography variant="body1" 
                className={classes.about} 
                align='center' 
                color="textSecondary" 
                paragraph>
                No bio
              </Typography>
            }
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">            
                <Grid item>
                  <Button variant="outlined" color="secondary" onClick={loadEditProfile}>
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
    </React.Fragment>
  );
}

CurrentUserCard.propTypes = {
  currentUser: PropTypes.object.isRequired,
  loadEditProfile: PropTypes.func.isRequired,
  reloadUser: PropTypes.func.isRequired,
};

export default CurrentUserCard;
