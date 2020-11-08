import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { truncate } from '../../util/methods';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import LabelIcon from '@material-ui/icons/Label';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditSnippet from './EditSnippet';
import DialogWithCallback from '../Common/DialogWithCallback';
import { deleteSnippet } from '../../redux/actions/snippets';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1, 1, 0, 0),
    width: 20,
    height: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function SnippetCard(props) {

	const { snippet, deleteSnippet } = {...props};
	const classes = useStyles();
	const [toggleDisplay, setToggleDisplay] = useState(false);
	const [toggleEdit, setToggleEdit] = useState(false);
	const [toggleDelete, setToggleDelete] = React.useState(false);

	const handleToggleActions = (action) => {
		if(action === "toggleEdit") {
			setToggleEdit(!toggleEdit);
			if(toggleDisplay) {
				setToggleDisplay(false);
			}
		}
		if(action === "toggleDisplay") {
			setToggleDisplay(!toggleDisplay);
			if(toggleEdit) {
				setToggleEdit(false);
			}
		}
		if(action === "toggleDelete") {
			setToggleDelete(!toggleDelete);
			if(toggleEdit) {
				setToggleEdit(false);
			}
		}
	}

	return (
		<Grid item key={snippet.id} xs={12} sm={6} md={4}>
			{!toggleEdit
				?
				<Card className={classes.card} style={{background: snippet.color ? snippet.color : null}}>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom 
						variant="h6" 
						component="h6">
						{snippet.title}
						</Typography>
						<Typography>
						{toggleDisplay 
							?
							snippet.body
							:
							truncate(snippet.body, 20)
						}
						</Typography>
						<Typography  
						variant="body2" 
						component="body2">
							<LabelIcon className={classes.icon} />
							{snippet.tags}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton onClick={() => handleToggleActions("toggleDisplay")} title="Display snippet">
							<NoteIcon />
						</IconButton>
						<IconButton onClick={() => handleToggleActions("toggleDelete")} title="Delete snippet">
							<DeleteIcon  onClick={() => handleToggleActions("toggleDelete")}/>
						</IconButton>
						<IconButton onClick={() => handleToggleActions("toggleEdit")} title="Edit snippet">
							<EditIcon />
						</IconButton>
					</CardActions>
				</Card>
				:
					<EditNote snippet={snippet} 
						handleToggleActions={handleToggleActions} />
			}
			{toggleDelete &&
				<DialogWithCallback 
          actionCallback={() => deleteSnippet(snippet.id)}
          actionName="Delete"
          title="Delete snippet"
          body={`Click delete to delete this snippet`}
				/>
			}
		</Grid>
	);
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSnippet: id => dispatch(deleteSnippet(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnippetCard);