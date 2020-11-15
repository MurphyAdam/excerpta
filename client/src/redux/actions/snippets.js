import {
	FETCH_SNIPPET,
	FETCH_SNIPPET_SUCCESS,
	FETCH_SNIPPET_FAILURE,
	DELETE_SNIPPET,
	DELETE_SNIPPET_SUCCESS,
	DELETE_SNIPPET_FAILURE,
	CREATE_SNIPPET,
	UPDATE_SNIPPET,
	SAVE_SNIPPET,
	SAVE_SNIPPET_SUCCESS,
} from '../constants/snippets';
import { error as notificationError } from 'react-notification-system-redux';
import { fetchSnippetsService, 
	deleteSnippetService, updateSnippetService } from '../../services/snippets-api';

const ActionCreatorFactory = (type, payload=null) => {
	return {
		type: type,
		payload: payload
	}
}

const fetchSnippets = page => ActionCreatorFactory(FETCH_SNIPPET);
const fetchSnippetsSuccess = data => ActionCreatorFactory(FETCH_SNIPPET_SUCCESS, data);
const fetchSnippetsError = error => ActionCreatorFactory(FETCH_SNIPPET_FAILURE, error);

export function getSnippets() {
	return (dispatch) => {
		dispatch(fetchSnippets());
		fetchSnippetsService()
		.then((response) => {
			if (response.status !== 200) {
				dispatch(fetchSnippetsError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(fetchSnippetsSuccess(response.data))
		})
		.catch((error) => {
			console.log("error =>", error)
			dispatch(fetchSnippetsError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to load snippets`,
			}));
		})
	};
}

const updateSnippetAction = data => ActionCreatorFactory(UPDATE_SNIPPET, data);

export function updateSnippet(snippet) {
	return (dispatch) => {
		dispatch(updateSnippetAction(snippet));
	}
}

const saveSnippetAction = data => ActionCreatorFactory(SAVE_SNIPPET, data);
const saveSnippetSuccess = data => ActionCreatorFactory(SAVE_SNIPPET_SUCCESS, data);

export function saveSnippet(snippetData, remote=false) {
	return (dispatch, getState) => {
		dispatch(saveSnippetAction(snippetData));
		let snippet = getState().snippets.snippets.find( snippet => snippet.id === snippetData.id );
		if(snippet){
			snippet = {...snippet, state: ''};
		}
		else return;
		if(!remote) {
			localStorage.setItem(`${snippet.id}#${snippet.title}`, JSON.stringify(snippet));
		}
		else {
			updateSnippetService(snippet)
			.then((response) => {
				if (response.status !== 200) {
					dispatch(fetchSnippetsError(response));
				}
				return response;
			})
			.then((response) => {
				dispatch(saveSnippetSuccess(response.data))
			})
			.catch((error) => {
				console.log(error.response)
				dispatch(updateSnippet({...snippet, state: '[remote saving failed]'}))
				dispatch(notificationError({'title': error.response.data.message || 
					error.request.statusText,
					'message': `Failed to save snippet to server`,
				}));
			})
		}
	}
}

const addSnippetAction = data => ActionCreatorFactory(CREATE_SNIPPET, data);

export function addSnippet(snippet) {
	return (dispatch) => {
		dispatch(addSnippetAction(snippet));
	}
}

const removeSnippet = page => ActionCreatorFactory(DELETE_SNIPPET);
const removeSnippetSuccess = data => ActionCreatorFactory(DELETE_SNIPPET_SUCCESS, data);
const removeSnippetError = error => ActionCreatorFactory(DELETE_SNIPPET_FAILURE, error);

export const deleteSnippet = id => {
	return (dispatch) => {
		dispatch(removeSnippet());
		deleteSnippetService(id)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(removeSnippetError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(removeSnippetSuccess({snippet: response.data?.snippet, snippet_id: id}));
		})
		.catch((error) => {
			dispatch(removeSnippetError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to delete snippet`,
			}));
		})
	}
}
