import { FETCH_SNIPPETS,
	FETCH_SNIPPETS_SUCCESS,
	FETCH_SNIPPETS_FAILURE,

	DELETE_SNIPPET,
	CREATE_SNIPPET,
	UPDATE_SNIPPET,
	SAVE_SNIPPET,
	SAVE_SNIPPET_REMOTE,
	SET_CURRENT_SNIPPET_META,
	CLOSE_SNIPPET,
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

// eslint-disable-next-line
  function countOpenSnippets(snippets) {
    let count = 0;
    snippets.filter(snippet => {
        // This is the item we care about
        if(snippet.state !== 'closed') {
          return count++;
        }
        return count;
    });
    return count;
  }


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
			// first element of the array is first file the user is faced with, so
			// we automatically pass context to it using the currentSnippetMeta
			const data = action.payload.results[0];
			return {...state,
					snippets: concatArrayOfObjectsAndSortWithDateAsc(action.payload.results || state.snippets),
					count: action.payload.count,
					isLoading: false,
					isLoaded: true, 
					currentSnippetMeta: {...state.currentSnippetMeta,
						name: data.name || state.currentSnippetMeta.name,
						id: data.id || state.currentSnippetMeta.id,
					}
				}
			}
		case FETCH_SNIPPETS_FAILURE: {
			return {...state, 
					isLoading: false,
					isLoaded: true, 
				}
			}
		case DELETE_SNIPPET: {
			const { id, tabId } = action.payload;
			const totalTabsCount = state.snippets.length - 1;
			const currentSnippetIndex = state.snippets.findIndex(
			(s) => s.id === id
			);
			const nextSnippetIndex = (currentSnippetIndex + 1) <= totalTabsCount ? currentSnippetIndex + 1 : null;
			const prevSnippetIndex = (currentSnippetIndex - 1) >= 0 ? currentSnippetIndex - 1 : null;
			// the above (currentSnippetIndex - 1) >= 0 
			// could also be expressed as (currentSnippetIndex - 1) <= totalTabsCount
			let directionIndex = 0;
			if((!nextSnippetIndex && !prevSnippetIndex) || currentSnippetIndex === -1) {
				directionIndex = 0;
			}
			else if(currentSnippetIndex === 0) {
				if(nextSnippetIndex) {
					directionIndex = nextSnippetIndex;
				}
			}
			else if(currentSnippetIndex > 0) {
				if(prevSnippetIndex >= 0) {
					directionIndex = prevSnippetIndex;
				}
				if(nextSnippetIndex) {
					directionIndex = nextSnippetIndex;
				}
			}
			const contextSnippet = state.snippets[directionIndex];
			console.log('tabId, currentSnippetIndex, directionIndex, nextSnippetIndex, prevSnippetIndex')
			console.log(tabId, currentSnippetIndex, directionIndex, nextSnippetIndex, prevSnippetIndex)
			directionIndex = directionIndex - 1 === - 1 ? 0 : directionIndex - 1;
			console.log('directionIndex', directionIndex)
			return {...state,
					snippets: filterArrayWithId(state.snippets, id),
					count: state.count -1,
					// we substracting 2 from count because:
					// -1 element that's been filtered out so array.length === count
					// -1 because TabId is always count - 1, therefore count - 2 to push focus
					// to the last tab/ array element
					currentSnippetMeta: {...state.currentSnippetMeta, 
						id: contextSnippet.id, 
						name: contextSnippet.name, 
						mode: contextSnippet.language,
						tabId: directionIndex, 
					}, 
				}
			}
		case CLOSE_SNIPPET: {
			// since we are only setting a snippet's state to "closed" which renderes it invisible 
			// in the UI as it's not mapped, we still have it as currentSnippetMeta, which is a problem 
			// in many ways. such as not displaying the next or previous snippet. Also sometimes when the 
			// closed snippets is one before the last; the last one gets displayed, but the context actions 
			// provided by currentSnippetMeta still point to the closed one. So what we need to do here is 
			// to pass context to either the next or the previous snippet depening on a few factors.
			// const { id, tabId } = action.payload;
			// const openSnippetsCount = countOpenSnippets(state.snippets);
			return state
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
