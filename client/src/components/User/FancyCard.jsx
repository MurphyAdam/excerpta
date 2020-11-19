import React from 'react';
import moment from 'moment';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BackButton } from '../Common/BackButton';
import FollowActionButton from './FollowActionButton';
import RoomActionButton from './RoomActionButton';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

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

function FancyUserCard(props) {
  const { user, isAuthenticated, reloadUser } = {...props};
  const classes = useStyles();

  return (
    <React.Fragment>
    <CssBaseline />
      <main>
        <BackButton />
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.avatarContainer}>
              <Avatar src={user.links.avatar} aria-label={user.username} className={classes.avatar} />
            </div>
            <Typography component="h4" 
              variant="h4" 
              align="center" 
              color="textPrimary" 
              gutterBottom>
              @{user.username}
            </Typography>
            <Breadcrumbs separator="-" 
              className={classes.breadcrumb} 
              aria-label="User Meta">
              <Typography variant="subtitle2" 
                color="inherit" 
                noWrap>
                Followers {user.followers_count}
                <PeopleIcon className={classes.icon} />
              </Typography>
              <Typography variant="subtitle2" 
                color="inherit" 
                noWrap>
                Active { moment(user.last_seen).fromNow() } ago
                <TodayIcon className={classes.icon} />
              </Typography>
            </Breadcrumbs>
            {user.about_me
              ? 
              <Typography variant="body1" 
                className={classes.about} 
                color="textSecondary" 
                paragraph>
                {user.about_me}
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
              {isAuthenticated &&
                <React.Fragment>                
                  <Grid item>
                    <FollowActionButton user={user} key={user.id} reloadUser={reloadUser}/>
                  </Grid>
                  <Grid item>
                    <RoomActionButton user={user} key={user.id} reloadUser={reloadUser}/>
                  </Grid>
                </React.Fragment>
              }
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}

FancyUserCard.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  reloadUser: PropTypes.func.isRequired,
};

export default FancyUserCard;
