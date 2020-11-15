import { FETCH_SNIPPET,
	FETCH_SNIPPET_SUCCESS, 
	FETCH_SNIPPET_FAILURE,
	DELETE_SNIPPET_SUCCESS,
	CREATE_SNIPPET,
	UPDATE_SNIPPET,
	SAVE_SNIPPET,
	SAVE_SNIPPET_SUCCESS,
	 } from '../constants/snippets';
import { INITIATE_AUTH_CLEANUP } from '../constants/auth';
import { filterArrayWithId, concatArrayOfObjectsAndSortWithDateAsc, 
	updateObjectInArrayWithId } from '../methods';

const INITIAL_STATE = {
		snippets: [],
		count: 0,
		isLoading: false,
		isLoaded: false,
		currentSnippet: {
			name: null,
			id: null,
		}
};

function snippets(state=INITIAL_STATE, action) {

	switch (action.type){
		case CREATE_SNIPPET: {
			return {...state,
					snippets: [...state.snippets, action.payload],
			};
		}
		case UPDATE_SNIPPET:
		case SAVE_SNIPPET:
		case SAVE_SNIPPET_SUCCESS: {
			return {...state,
					snippets: updateObjectInArrayWithId(state.snippets, action.payload),
			};
		}
		case FETCH_SNIPPET: {
			return {...INITIAL_STATE, 
					isLoading: true,
				}
			}
		case FETCH_SNIPPET_SUCCESS: {
			return {...state,
					snippets: concatArrayOfObjectsAndSortWithDateAsc(action.payload.results || state.snippets),
					count: action.payload.count,
					isLoading: false,
					isLoaded: true, 
				}
			}
		case FETCH_SNIPPET_FAILURE: {
			return {...state, 
					isLoading: false,
					isLoaded: true, 
				}
			}
		case DELETE_SNIPPET_SUCCESS: {
			return {...state,
					snippets: filterArrayWithId(state.snippets, action.payload.snippet_id),
					count: state.snippets.length,
					isLoading: false,
					isLoaded: true,
				}
			}
		case INITIATE_AUTH_CLEANUP: {
			return INITIAL_STATE
		}
		default:
			return state;
	}
}

export default snippets;
