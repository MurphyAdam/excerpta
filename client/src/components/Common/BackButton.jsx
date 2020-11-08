import React from 'react'
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const BackButton = (props) => {

	const classes = useStyles();

  const onBackClick = () => {
    window.history.back();
  };

  return (
    <React.Fragment>
      <IconButton 
        className={classes.margin}
        color={props.color || "default"} 
        onClick={() => onBackClick()}>
        <ArrowBackIcon titleAccess="Go back" />
      </IconButton>
      {props.title
        &&
        <Typography 
          variant="title">
          {props.title}
        </Typography>
      }
    </React.Fragment>
	)
}