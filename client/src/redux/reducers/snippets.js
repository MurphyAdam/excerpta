import { FETCH_SNIPPET,
	FETCH_SNIPPET_SUCCESS, 
	FETCH_SNIPPET_FAILURE,
	REFETCH_SNIPPET_SUCCESS,
	DELETE_SNIPPET_SUCCESS,
	 } from '../constants/snippets';
import { INITIATE_AUTH_CLEANUP } from '../constants/auth';
import { filterArrayWithId, concatArrayOfObjectsAndSortWithDateAsc } from '../methods';

const INITIAL_STATE = {
		snippets: [],
		count: 0,
		isLoading: false,
		isLoaded: false,
};

function snippets(state=INITIAL_STATE, action) {

	switch (action.type){
		case FETCH_SNIPPET: {
			return {...INITIAL_STATE, 
					isLoading: true
				}
			}
		case FETCH_SNIPPET_SUCCESS: {
			return {...state,
					snippets: concatArrayOfObjectsAndSortWithDateAsc(action.payload.snippets || state.snippets),
					count: state.snippets.length,
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
		case REFETCH_SNIPPET_SUCCESS: {
			return {...state, 
					snippets: concatArrayOfObjectsAndSortWithDateAsc(
						filterArrayWithId(state.snippets, action.payload?.snippet?.id), [action.payload?.snippet]),
					count: state.snippets.length,
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
