import { FETCH_SNIPPETS,
	FETCH_SNIPPETS_SUCCESS,
	FETCH_SNIPPETS_FAILURE,

	DELETE_SNIPPET,
	CREATE_SNIPPET,
	UPDATE_SNIPPET,
	SAVE_SNIPPET,
	SAVE_SNIPPET_REMOTE,
	SET_CURRENT_SNIPPET_META,
	 } from '../constants/snippets';
import { filterArrayWithId, concatArrayOfObjectsAndSortWithDateAsc, 
	updateObjectInArrayWithId } from '../methods';

const INITIAL_STATE = {
		snippets: [],
		count: 0,
		isLoading: false,
		isLoaded: false,
		currentSnippetMeta: {
			name: null,
			id: null,
			tabId: 0,
		}
};

function snippets(state=INITIAL_STATE, action) {

	switch (action.type){
		case CREATE_SNIPPET: {
			return {...state,
					snippets: [...state.snippets, action.payload],
					count: state.count + 1,
					// we use this to push focus to the newly created snippet. 
					// TabIds start at 0 (since they are arrays themeselves), 
					// so when we map an array of length 3 for example, the result is:
					// array[0] = tabId 0, array[1] = tabId 1 and so on, so an array of 3 would end
					// at array[2] = tabId 2; but here we use count to set TabId, and count is really 
					// just array.length so: TabId = 3, which is in plain words would mean it's the 
					// fourth value (tab) (which doesn't exist). 
					// Take away: TabId = currentCount || array.currentLength - 1.
					// even though we increameant the count above and use it again below, the one below, 
					// is still the old count, that's why we are not running into problems.
					currentSnippetMeta: {...state.currentSnippetMeta, tabId: state.count}, 
			};
		}
		case UPDATE_SNIPPET:
		case SAVE_SNIPPET:
		case SAVE_SNIPPET_REMOTE: {
			return {...state,
					snippets: updateObjectInArrayWithId(state.snippets, action.payload),
			};
		}
		case FETCH_SNIPPETS: {
			return {...INITIAL_STATE, 
					isLoading: true,
				}
			}
		case FETCH_SNIPPETS_SUCCESS: {
			return {...state,
					snippets: concatArrayOfObjectsAndSortWithDateAsc(action.payload.results || state.snippets),
					count: action.payload.count,
					isLoading: false,
					isLoaded: true, 
				}
			}
		case FETCH_SNIPPETS_FAILURE: {
			return {...state, 
					isLoading: false,
					isLoaded: true, 
				}
			}
		case DELETE_SNIPPET: {
			return {...state,
					snippets: filterArrayWithId(state.snippets, action.payload),
					count: state.count -1,
					// we substracting 2 from count because:
					// -1 element that's been filtered out so array.length === count
					// -1 because TabId is always count - 1, therefore count - 2 to push focus
					// to the last tab/ array element
					currentSnippetMeta: {...state.currentSnippetMeta, tabId: state.count - 2}, 
				}
			}
		case SET_CURRENT_SNIPPET_META: {
			return {...state, 
				currentSnippetMeta: {...state.currentSnippetMeta, ...action.payload},
			}
		}
		default:
			return state;
	}
}

export default snippets;
