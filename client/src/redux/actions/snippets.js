import {
	FETCH_SNIPPETS,
	FETCH_SNIPPETS_SUCCESS,
	FETCH_SNIPPETS_FAILURE,

	FETCH_PUBLIC_SNIPPETS,
	FETCH_PUBLIC_SNIPPETS_SUCCESS,
	FETCH_PUBLIC_SNIPPETS_FAILURE,

	DELETE_SNIPPET,
	CREATE_SNIPPET,
	UPDATE_SNIPPET,
	SAVE_SNIPPET,
	SAVE_SNIPPET_REMOTE,
	SET_CURRENT_SNIPPET_META,
	CLOSE_SNIPPET,
} from '../constants/snippets';
import { error as notificationError } from 'react-notification-system-redux';
import { fetchSnippetsService, fetchPublicSnippetsService,
	deleteSnippetService, updateSnippetService } from '../../services/snippets-api';
import { ActionCreatorFactory } from '../methods';


const setCurrentSnippetMetaAction = data => ActionCreatorFactory(SET_CURRENT_SNIPPET_META, data);

export function setCurrentSnippetMeta(snippetMeta) {
	return (dispatch) => {
		dispatch(setCurrentSnippetMetaAction(snippetMeta));
	}
}

const fetchSnippets = page => ActionCreatorFactory(FETCH_SNIPPETS);
const fetchSnippetsSuccess = data => ActionCreatorFactory(FETCH_SNIPPETS_SUCCESS, data);
const fetchSnippetsError = error => ActionCreatorFactory(FETCH_SNIPPETS_FAILURE, error);

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

const fetchPublicSnippets = page => ActionCreatorFactory(FETCH_PUBLIC_SNIPPETS);
const fetchPublicSnippetsSuccess = data => ActionCreatorFactory(FETCH_PUBLIC_SNIPPETS_SUCCESS, data);
const fetchPublicSnippetsError = error => ActionCreatorFactory(FETCH_PUBLIC_SNIPPETS_FAILURE, error);

export function getPublicSnippets() {
	return (dispatch) => {
		dispatch(fetchPublicSnippets());
		fetchPublicSnippetsService()
		.then((response) => {
			if (response.status !== 200) {
				dispatch(fetchPublicSnippetsError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(fetchPublicSnippetsSuccess(response.data))
		})
		.catch((error) => {
			console.log("error =>", error)
			dispatch(fetchPublicSnippetsError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to load public snippets`,
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

const closeSnippetAction = data => ActionCreatorFactory(CLOSE_SNIPPET, data);

export function closeSnippet(snippetMeta) {
	return (dispatch) => {
		dispatch(closeSnippetAction(snippetMeta));
	}
}

const saveSnippetAction = data => ActionCreatorFactory(SAVE_SNIPPET, data);
const saveSnippetRemoteAction = data => ActionCreatorFactory(SAVE_SNIPPET_REMOTE, data);

export function saveSnippet(snippetData, remote=false) {
	return (dispatch, getState) => {
		dispatch(saveSnippetAction(snippetData));
		let snippet = getState().snippets.snippets.find( snippet => snippet.id === snippetData.id );
		if(snippet){
			snippet = {...snippet, state: ''};
		}
		else return;
		if(!remote) {
			localStorage.setItem(`${snippet.id}#${snippet.name}`, JSON.stringify(snippet));
		}
		else {
			updateSnippetService(snippet)
			.then((response) => {
				dispatch(saveSnippetRemoteAction(response.data))
			})
			.catch((error) => {
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

const removeSnippetAction = snippetMeta => ActionCreatorFactory(DELETE_SNIPPET, snippetMeta);

export const deleteSnippet = snippetMeta => {
	return (dispatch) => {
		deleteSnippetService(snippetMeta.id)
		.then((response) => {
			dispatch(removeSnippetAction(snippetMeta));
		})
		.catch((error) => {
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to delete snippet`,
			}));
		})
	}
}
