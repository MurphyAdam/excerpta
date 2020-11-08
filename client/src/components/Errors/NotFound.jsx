import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BackButton } from '../Common/BackButton';
import notFoundPng from '../../assets/images/not-found.png';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex",
    margin: theme.spacing()
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160,
  },
}));

export default function NotFound() {

  const classes = useStyles()

  return (
    <React.Fragment>
      <Grid container spacing={1} className={classes.mainGrid}>
        <Grid item md={12}>
          <Typography 
            variant="h5" 
            gutterBottom>
            <BackButton title="Go back"/>
          </Typography>
          <img src={notFoundPng} alt='Page not found' />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
