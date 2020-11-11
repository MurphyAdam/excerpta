import {
	FETCH_SNIPPET,
	FETCH_SNIPPET_SUCCESS,
	FETCH_SNIPPET_FAILURE,
	REFETCH_SNIPPET,
	REFETCH_SNIPPET_SUCCESS,
	REFETCH_SNIPPET_FAILURE,
	DELETE_SNIPPET,
	DELETE_SNIPPET_SUCCESS,
	DELETE_SNIPPET_FAILURE,
	UPDATE_SNIPPET,
} from '../constants/snippets';
import { error as notificationError } from 'react-notification-system-redux';
import { fetchSnippetsService, fetchSnippetService, 
	deleteSnippetService } from '../../services/snippets-api';
import { concatArrayOfObjectsAndSortWithDateAsc } from '../methods';

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

export const setSnippet = (snippet) => {
	return (dispatch, getState) => {
		if(snippet) {
			let snippets = getState().snippets.snippets;
			snippets = concatArrayOfObjectsAndSortWithDateAsc(snippets, [snippet])
			dispatch(fetchSnippetsSuccess({snippets}));
			return;
		}
	}
}

const updateSnippetAction = data => ActionCreatorFactory(UPDATE_SNIPPET, data);

export function updateSnippet(snippet) {
	return (dispatch) => {
		dispatch(updateSnippetAction(snippet));
	}
}

const refetchSnippets = page => ActionCreatorFactory(REFETCH_SNIPPET);
const refetchSnippetsSuccess = data => ActionCreatorFactory(REFETCH_SNIPPET_SUCCESS, data);
const refetchSnippetsError = error => ActionCreatorFactory(REFETCH_SNIPPET_FAILURE, error);

export const refetchSnippet = id => {
	return (dispatch) => {
		dispatch(refetchSnippets());
		fetchSnippetService(id)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(refetchSnippetsError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(refetchSnippetsSuccess(response.data));
		})
		.catch((error) => {
			dispatch(refetchSnippetsError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to refetch snippet`,
			}));
		})
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
