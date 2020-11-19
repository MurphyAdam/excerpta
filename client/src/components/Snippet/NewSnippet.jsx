import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { languages } from '../../constants';

import { createSnippetService } from '../../services/snippets-api';

import { useDispatch } from 'react-redux';
import { error as notificationError } from 'react-notification-system-redux';
import { notificationTemplate } from '../../redux/methods';
import { addSnippet } from '../../redux/actions/snippets';

export default function NewSnippet(props) {
  const { open, onOpen, onClose, setCurrentSnippetMeta, handleFileMenuClose } = props;
  const dispatch = useDispatch();
  const radioGroupRef = React.useRef(null);
  const [snippet, setSnippet] = useState(
    {
      name: '', 
      language: ''
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
      onClose();
      // the response returns the created snippet
      // we add it to our snippets
      dispatch(addSnippet(response.data));
      // we use handleFileMenuClose to close the File Menu
      // upon a successfully file creation
      handleFileMenuClose();
      setCurrentSnippetMeta({id: response.data.id, name: response.data.name});
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

  const handleFieldChange = event => {
    const { name, value } = event.target;
    setSnippet(snippet => ({ ...snippet, [name]: value }));
  }

  const handleChange = (event) => {
    setSnippet({...snippet, language: event.target.value});
  };

  return (
      <Dialog fullScreen={true} 
        open={open} 
        onOpen={onOpen} 
        onClose={onClose} 
        aria-labelledby="form-create-new-snippet">
        <DialogTitle id="form-snippet-file-name">New Snippet File</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            File name (and extension)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="File name"
            type="text"
            value={snippet.name}
            onChange={handleFieldChange}
            fullWidth
          />
          <DialogContentText>
            Language
          </DialogContentText>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="Language"
            name="language"
            value={snippet.language}
            onChange={handleChange}
          >
            {languages.map((lang) => (
              <FormControlLabel value={lang} key={lang} control={<Radio />} label={lang} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={isLoading} >
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
}
