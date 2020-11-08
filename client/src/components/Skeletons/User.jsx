import React from 'react';
import { Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Grid, 
  IconButton, 
  Typography   } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import FavoriteIcon from '@material-ui/icons/Favorite';


export function UserCardSkeleton() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />
            }
            title={<Skeleton animation="wave" width="40%" style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation="wave" width="30%" style={{ marginBottom: 6 }} />}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" width="60%" component="p">
              <Skeleton variant="text" />
            </Typography>
            <Typography variant="body2" color="textSecondary" width="40%" component="p">
              <Skeleton variant="text" />
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
