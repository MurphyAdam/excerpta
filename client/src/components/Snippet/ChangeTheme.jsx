import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { themes } from '../../constants';


export default function ChangeTheme(props) {
  const { open, onOpen, onClose, editorPreferencesStateAction } = props;
  const { editorPreferences, updateEditorPreferences } = editorPreferencesStateAction;
  const radioGroupRef = React.useRef(null);
  const [currentTheme, setCurrentTheme] = useState(editorPreferences.theme);

  const changeTheme = (event) => {
    const theme = event.target.value;
    setCurrentTheme(theme)
    updateEditorPreferences({theme});
  }

  return (
      <Dialog 
        fullWidth={true}
        maxWidth="sm"
        open={open} 
        onOpen={onOpen} 
        onClose={onClose} 
        aria-labelledby="form-create-new-snippet">
        <DialogTitle id="form-snippet-file-name">Change theme</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Theme
          </DialogContentText>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="Theme"
            name="theme"
            value={currentTheme}
            onChange={changeTheme}
          >
            {themes.map((theme) => (
              <FormControlLabel value={theme} key={theme} control={<Radio />} label={theme} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary" >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
  );
}
