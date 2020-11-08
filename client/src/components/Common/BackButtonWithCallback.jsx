import React from 'react'
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const BackButtonWithCallback = (props) => {

	const classes = useStyles();
  const { title, callback, callbackProps } = {...props};

  return (
    <React.Fragment>
      <IconButton 
        className={classes.margin}
        color={props.color || "default"} 
        onClick={() => callback(...callbackProps)}>
        <ArrowBackIcon titleAccess="Go back" />
      </IconButton>
      {title
        &&
        <Typography 
          variant="title">
          {title}
        </Typography>
      }
    </React.Fragment>
	)
}

BackButtonWithCallback.propTypes = {
  title: PropTypes.string,
  callback: PropTypes.func.isRequired,
  callbackProps: PropTypes.array.isRequired,
};

export default BackButtonWithCallback;