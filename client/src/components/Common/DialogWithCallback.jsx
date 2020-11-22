import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function DialogWithCallback(props) {

	const { open, onClose, title, body, actionName, actionCallback } = props;
 
	const actionCallbackAndClose = () => {
		actionCallback();
		onClose();
	}

	return (
		<Dialog open={open} onClose={onClose} 
			disableBackdropClick={true}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{body}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" 
					onClick={onClose} 
					variant="contained">
				 Cancel
				</Button>
				<Button color="secondary" 
					autoFocus="autoFocus" 
					onClick={actionCallbackAndClose}
					variant="contained">
				 {actionName || 'Delete'}
				</Button>
			</DialogActions>
		</Dialog>
  );
}
export default DialogWithCallback;