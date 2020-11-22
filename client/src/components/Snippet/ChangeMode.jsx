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
import { languages } from '../../constants';


export default function ChangeMode(props) {
  const { open, onOpen, onClose, editorPreferencesStateAction } = props;
  const { editorPreferences, updateEditorPreferences } = editorPreferencesStateAction;
  const radioGroupRef = React.useRef(null);
  const [currentMode, setCurrentMode] = useState(editorPreferences.mode);

  const changeMode = async (event) => {
    const mode = event.target.value;
    setCurrentMode(mode);
    updateEditorPreferences({mode: mode});
  }
  return (
      <Dialog 
        fullWidth={true}
        maxWidth="sm"
        open={open} 
        onOpen={onOpen} 
        onClose={onClose} 
        aria-labelledby="form-create-new-snippet">
        <DialogTitle id="form-snippet-file-name">Change mode</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Mode
          </DialogContentText>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="Language"
            name="language"
            value={currentMode}
            onChange={changeMode}
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
          <Button onClick={onClose} color="primary" >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
  );
}
