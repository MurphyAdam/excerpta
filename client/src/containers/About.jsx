import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import IconButton from '@material-ui/core/IconButton';
import SwipeableTextMobileStepper from '../components/SwipeableTextMobileStepper';

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    margin: theme.spacing(1),
    boxShadow: 'none !important'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    minWidth: 160,
    maxWidth: 'fit-content'
  },
  a: {
    textDecoration: 'none',
    color: theme.palette.secondary.main
  },
  divider: {
    margin: theme.spacing(1, 0, 2, 0),
  }
}));

const About = (props) => {

	const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container component={Paper}>
        <Grid item xs={12}>
          <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  gutterBottom
                >
                  Excerpta: A Simple Code Manager
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  color="textSecondary"
                  paragraph>
                  Code management app built with React, Redux, Material-UI, Django and DRF.
                  <a href="https://github.com/MurphyAdam" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className={classes.a}> By: @GitHub/MurphyAdam (Majdi)
                  </a>
                </Typography>
                <Typography 
                  variant="h6" 
                  gutterBottom
                >
                  Features
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  color="textSecondary"
                  paragraph>
                  Create files
                  <br/>
                  Save locally and remotely
                  <br/>
                  Download files locally
                  <br/>
                  Close and delete files
                  <br/>
                  Change themes
                  <br/>
                  Change modes (language highlights)
                  <br/>
                  Change font size
                  <br/>
                </Typography>
                <IconButton 
                  component="a"
                  title="GitHub" 
                  aria-label="GitHub" 
                  color="inherit"
                  href="https://github.com/MurphyAdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  <GitHubIcon />
                </IconButton>
                <IconButton 
                  component="a"
                  title="LinkedIn" 
                  aria-label="LinkedIn" 
                  color="inherit"
                  href="https://www.linkedin.com/in/majdi-mahfoud-258461198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  component="a"
                  title="Email" 
                  aria-label="Email" 
                  color="inherit"
                  href="mailto:langandcode@gmail.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  <MailIcon />
                </IconButton>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
      <SwipeableTextMobileStepper />
    </React.Fragment>
  );
}

export default About;