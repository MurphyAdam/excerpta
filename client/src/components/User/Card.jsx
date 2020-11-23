import React from 'react';
import { Card, 
  CardHeader, 
  CardContent, 
  Grid, 
  Avatar, 
  Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { truncate } from '../../util/methods';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(1),
    width: 20,
    height: 20,
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none'
  }
}));

export default function UserCard(props) {

  const { user } = {...props};
  const classes = useStyles();

  const renderProfileLink = (user) => {
    return (
      <React.Fragment>
        <RouterLink 
          to={`/users/${ user.id }`} 
          className={classes.link}
          color="textSecondary">
          @{user.username}
        </RouterLink>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            avatar={
              <Avatar src={user.links.avatar} aria-label={user.username} />
            }
            title={renderProfileLink(user)}
            subheader={`Active ${ formatDistanceToNow(new Date (Date.parse(user.last_seen))) } ago`}
          />
          <CardContent>
            {user.about_me
              ? 
              <Typography variant="body1" 
                color="textSecondary" 
                paragraph>
                {truncate(user.about_me)}
              </Typography>
              : 
              <Typography variant="body1" 
                color="textSecondary" 
                paragraph>
                No bio
              </Typography>
            }
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
