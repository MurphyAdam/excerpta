import React, { useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom"
import { makeStyles} from '@material-ui/core';
import { CircularLoader } from './Common/Loaders';
import { connect } from 'react-redux';
import { getFooterData } from '../redux/actions/app';
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://langandcode.com">
        langandcode.com
      </Link>{' '}
      2019 - {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  chipContainer: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    color: theme.palette.common.white,
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
}));


function Footer(props) {

  const { footer, loadData } = {...props};
  const classes = useStyles();

  useEffect(() => {
    if(!footer.isLoading && !footer.isLoaded) loadData();
  }, [footer, loadData]);


  const handleFooterRefresh = () => loadData();

  const renderTagLink = (tag) => {
    return (
        <RouterLink 
          to={`/posts/tag/${ tag }`} 
          className={classes.link}>
          {tag}
        </RouterLink>
    )
  }

  const renderCategoryLink = (category) => {
    return (
        <RouterLink to={`/posts/category/${ category }`} 
          className={classes.link}>
          {category}
        </RouterLink>
    )
  }

  return (
      <Container component="footer" className={classes.footer}>
      {footer.isLoading
        && <CircularLoader />
      }
      {footer.isLoaded &&
          <React.Fragment>
            <Grid container spacing={1} justify="space-evenly">
                <Grid item xs={6}>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Tags
                  </Typography>
                  <div className={classes.chipContainer}>
                    {footer.tags.map(tag => (
                        <Chip
                          key={tag.id}
                          label={renderTagLink(tag.name)}
                          color="secondary"
                          className={classes.chip}
                          clickable
                        />
                      ))
                    }
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Categories
                  </Typography>
                  <div className={classes.chipContainer}>
                    {footer.categories.map(cat => (
                        <Chip
                          key={cat.id}
                          label={renderCategoryLink(cat.name)}
                          color="secondary"
                          className={classes.chip}
                          clickable
                        />
                      ))
                    }
                  </div>
                </Grid>
              </Grid>
              {footer.isError && 
                <React.Fragment>
                  <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                    Could not load footer tags: {footer.error} 
                  </Typography>
                  <Fab 
                    variant="extended"
                    size="small" 
                    color="secondary" 
                    onClick={handleFooterRefresh} 
                    className={classes.button}>
                    Reload
                  </Fab>
                </React.Fragment>
              }
              <Breadcrumbs separator="-" aria-label="Legal">
                <Link to="/privacy" component={RouterLink} variant="subtitle1" color="textSecondary">
                  Privacy policy
                </Link>
                <Link to="/terms" component={RouterLink} variant="subtitle1" color="textSecondary">
                  Terms of use
                </Link>
                <Link to="/about" component={RouterLink} variant="subtitle1" color="textSecondary">
                  About
                </Link>
              </Breadcrumbs>
              <Box mt={5}>
                <Copyright />
              </Box>
          </React.Fragment>
        }
      </Container>
    )
}

const mapStateToProps = (state) => {
  return {
    footer: state.app.footer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(getFooterData())
  };
};

Footer.propTypes = {
  footer: PropTypes.object,
  loadData: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Footer);