import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';

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
        <Grid item xs={12} sm={6} md={6}>
          <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  gutterBottom
                >
                  Snippets: A Simple Code Snippets Manager
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  color="textSecondary"
                  paragraph>
                  Minimalistic code snippets management app built with React + Material-UI, and served with Flask. Star, 
                  fork or contribute if you wish so. 
                  <a href="https://github.com/MurphyAdam" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className={classes.a}> By: @GitHub/MurphyAdam (Majdi)
                  </a>
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
                  title="Source code" 
                  aria-label="Source code" 
                  color="inherit"
                  href="https://github.com/MurphyAdam/Snippets"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  <CodeIcon />
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
              <CardMedia
                className={classes.cardMedia}
                image="https://res.cloudinary.com/lang-code/image/upload/v1600369514/images/notes_lkh985.png"
                title="Snippets"
              />
            </Card>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default About;