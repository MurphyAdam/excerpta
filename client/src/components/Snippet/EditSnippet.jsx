import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import CardActions from '@material-ui/core/CardActions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import DoneIcon from '@material-ui/icons/Done';
import { updateSnippetService } from '../../services/snippets-api';

import {connect} from 'react-redux';
import { error as notificationError } from 'react-notification-system-redux';
import { refetchSnippet } from '../../redux/actions/snippets';
import { snippetColor } from '../../constants';
import PropTypes from 'prop-types';

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
    margin: theme.spacing(0.5)
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
}));

function EditSnippet(props) {

	const { snippet, handleToggleActions, addNotification, refetchSnippet } = {...props};
  const classes = useStyles();
  const [snippetUpdate, setSnippetUpdate] = useState(
  	{
      id: snippet.id,
  		title: snippet.title, 
  		body: snippet.body, 
  		color: snippet.color, 
  		tags: snippet.tags
  	});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Api Call To Create Snippet
      await updateSnippetService(snippetUpdate);
      refetchSnippet(snippet.id);
      // The Request Was Fulffiled And The Snippet Was updated
      // So Let's Hide The EditSnippet Component
      handleToggleActions("toggleDisplay");
    } catch (error) {
        // display notification for error
        addNotification({'title': error.response.data.message || 
          error.request.statusText,
          'message': `Failed to edit snippet`,
        }, notificationError);
    }
    setIsLoading(false);
  }

  const handleColorChange = color => {
    setSnippetUpdate(snippetUpdate => ({ ...snippetUpdate, color: color }));
  };

  const handleFieldChange = event => {
    const { name, value } = event.target;
    setSnippetUpdate(snippetUpdate => ({ ...snippetUpdate, [name]: value }));
	}

  const Circle = (props) => {
  	const { color } = {...props}
  	return (
  		<div className={clsx(classes.shape, classes.shapeCircle)} 
  				name="color"
					style={{background: color ? color : 'red'}} 
					onClick={() => handleColorChange(color)} />
			);
  }

return (
	<Card className={classes.card} style={{background: snippetUpdate.color ? snippetUpdate.color : null}}>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="filled-multiline-static"
          label="Title"
          name="title"
          multiline
          rowsMax={2}
          value={snippetUpdate.title}
          onChange={handleFieldChange}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Body"
          name="body"
          multiline
          rowsMax={10}
          value={snippetUpdate.body}
          onChange={handleFieldChange}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Tags"
          name="tags"
          multiline
          rowsMax={2}
          value={snippetUpdate.tags}
          onChange={handleFieldChange}
          variant="filled"
        />
        <div className={classes.colors}>
	        Color
	        <Breadcrumbs separator=" ">
		        {snippetColor.map((color) => (
		        		<Circle color={color} />
		        	))
		        }
	        </Breadcrumbs>
	      </div>
      </div>
    </form>
		<CardActions>
			<IconButton onClick={() => handleToggleActions("toggleDisplay")}>
				<NoteIcon />
			</IconButton>
			<IconButton>
				<DeleteForeverIcon />
			</IconButton>
			<IconButton onClick={() => handleToggleActions("toggleEdit")}>
				<EditIcon />
			</IconButton>
      <IconButton onClick={handleSubmit} disabled={isLoading}>
        <DoneIcon />
      </IconButton>
		</CardActions>
  </Card>
  );
}

EditSnippet.propTypes = {
  snippet: PropTypes.object,
  handleToggleActions: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  refetchSnippet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refetchSnippet: id => dispatch(refetchSnippet(id)),
    addNotification: (data, level) => dispatch(level(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditSnippet);
