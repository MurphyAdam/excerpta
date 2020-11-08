import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import { createSnippetService } from '../../services/snippets-api';

import { useDispatch } from 'react-redux';
import { error as notificationError } from 'react-notification-system-redux';
import { notificationTemplate } from '../../redux/methods';
import { setSnippet as addSnippet } from '../../redux/actions/snippets';
import { snippetColors } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '95% ',
    },
  },
  shape: {
    width: 30,
    height: 30,
  },
  shapeCircle: {
    borderRadius: '25%',
  },
  colors: {
  	margin: theme.spacing(1),
  	'& > *': {
      margin: theme.spacing(1),
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardColor: {
    color: theme.palette.common.white,
  }
}));

function AddSnippet(props) {

  const { setDisplayAddSnippetComponent } = {...props};
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(classes.cardColor.color);
  const [snippet, setSnippet] = useState(
    {
      title: null, 
      body: null, 
      color: "rgb(76 175 80 / 22%)", 
      tags: null
    });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Api Call To Create Snippet
      const response = await createSnippetService(snippet);
      // The Request Was Fulffiled And The Snippet Was Created
      // So Let's Hide The AddSnippet Component
      setDisplayAddSnippetComponent(false);
      // the response returns the created snippet
      // we add it to our snippets
      dispatch(addSnippet(response.data.snippet));
    } catch (error) {
        // display notification for error
        dispatch(notificationError({'title': error.response.data.message || 
          error.request.statusText,
          'autoDismiss': 0,
          'message': `Failed to add snippet`,
          'children': notificationTemplate.renderArray(error.response?.data?.errors),
        }));
    }
    setIsLoading(false);
  }

  const handleColorChange = color => {
    setSnippet(snippet => ({ ...snippet, color: color }));
  };

  const handleFieldChange = event => {
    const { name, value } = event.target;
    setSnippet(snippet => ({ ...snippet, [name]: value }));
	}

  const Circle = (props) => {
  	const { color } = {...props}
  	return (
  		<div className={clsx(classes.shape, classes.shapeCircle)} 
  				name="color"
					style={{background: color ? color : null}} 
					onClick={() => handleColorChange(color)} />
			);
  }

return (
	<Card className={classes.card} style={{background: snippet.color ? snippet.color : null}}>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="filled-multiline-static"
          label="Title"
          name="title"
          multiline
          rowsMax={2}
          value={snippet.title}
          onChange={handleFieldChange}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Body"
          name="body"
          multiline
          rowsMax={10}
          value={snippet.body}
          onChange={handleFieldChange}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Tags"
          name="tags"
          multiline
          rowsMax={2}
          value={snippet.tags}
          onChange={handleFieldChange}
          variant="filled"
        />
        <div className={classes.colors}>
	        Color
	        <Breadcrumbs separator=" ">
		        {snippetColors.map((color) => (
		        		<Circle color={color} />
		        	))
		        }
	        </Breadcrumbs>
	      </div>
      </div>
    </form>
		<CardActions>
      <IconButton onClick={handleSubmit} disabled={isLoading}>
        <DoneIcon />
      </IconButton>
		</CardActions>
  </Card>
  );
}


export default AddSnippet;