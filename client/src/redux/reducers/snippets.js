import { FETCH_SNIPPETS,
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
import { INITIATE_AUTH_CLEANUP } from '../constants/auth';
import { filterArrayWithId, concatArrayOfObjectsAndSortWithDateAsc, 
	updateObjectInArrayWithId } from '../methods';

const INITIAL_STATE = {
		mySnippets: {
			snippets: [],
			count: 0,
			current: null,
			pageSize: null,
			totalPages: null,
			links: {
				previous: null,
				next: null,
			},
			isLoading: false,
			isLoaded: false,
		},
		currentSnippetMeta: {
			name: null,
			id: null,
			tabId: 0,
		},
		publicSnippets: {
			snippets: [],
			count: 0,
			current: null,
			pageSize: null,
			totalPages: null,
			links: {
				previous: null,
				next: null,
			},
			isLoading: false,
			isLoaded: false,
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
					mySnippets: {...state.mySnippets, 
						snippets: [...state.mySnippets.snippets, action.payload],
						count: state.mySnippets.count + 1,
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
						},
					currentSnippetMeta: {...state.currentSnippetMeta, tabId: state.mySnippets.count}, 
			};
		}
		case UPDATE_SNIPPET:
		case SAVE_SNIPPET:
		case SAVE_SNIPPET_REMOTE: {
			return {...state,
				mySnippets: {...state.mySnippets,
					snippets: updateObjectInArrayWithId(state.mySnippets.snippets, action.payload),
				}
			};
		}
		case FETCH_SNIPPETS: {
			return {...state, 
					mySnippets: {
						...state.mySnippets,
						isLoading: true,
						isLoaded: false, 
					}
				}
			}
		case FETCH_SNIPPETS_SUCCESS: {
			const { results, count, links, current, page_size, total_pages } = action.payload;
			// first element of the array is first file the user is faced with, so
			// we automatically pass context to it using the currentSnippetMeta
			const currentMetaData = results[0];
			return {...state,
					mySnippets: {
						snippets: concatArrayOfObjectsAndSortWithDateAsc(results),
						count: count,
						previous: links.previous,
						next: links.next,
						current: current,
						pageSize: page_size,
						totalPages: total_pages,
						isLoading: false,
						isLoaded: true, 
					},
					currentSnippetMeta: {...state.currentSnippetMeta,
						name: currentMetaData?.name || state.currentSnippetMeta.name,
						id: currentMetaData?.id || state.currentSnippetMeta.id,
					}
				}
			}
		case FETCH_SNIPPETS_FAILURE: {
			return {...state, 
					mySnippets: {
						...state.mySnippets,
						isLoading: false,
						isLoaded: true, 
					}
				}
			}
		case FETCH_PUBLIC_SNIPPETS: {
			return {...state, 
					publicSnippets: {
						...state.publicSnippets,
						isLoading: true,
						isLoaded: false, 
					}
				}
			}
		case FETCH_PUBLIC_SNIPPETS_SUCCESS: {
			const { results, count, links, current, page_size, total_pages } = action.payload;
			return {...state,
					publicSnippets: {
						snippets: concatArrayOfObjectsAndSortWithDateAsc(results),
						count: count,
						previous: links.previous,
						next: links.next,
						current: current,
						pageSize: page_size,
						totalPages: total_pages,
						isLoading: false,
						isLoaded: true, 
					}
				}
			}
		case FETCH_PUBLIC_SNIPPETS_FAILURE: {
			return {...state, 
					publicSnippets: {
						...state.publicSnippets,
						isLoading: false,
						isLoaded: true, 
					}
				}
			}
		case DELETE_SNIPPET: {
			const { id } = action.payload;
			const totalTabsCount = state.mySnippets.snippets.length - 1;
			const currentSnippetIndex = state.mySnippets.snippets.findIndex(
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
			const contextSnippet = state.mySnippets.snippets[directionIndex];
			directionIndex = directionIndex - 1 === - 1 ? 0 : directionIndex - 1;
			return {...state,
					mySnippets: {
						snippets: filterArrayWithId(state.mySnippets.snippets, id),
						count: state.mySnippets.count -1,
						// we substracting 2 from count because:
						// -1 element that's been filtered out so array.length === count
						// -1 because TabId is always count - 1, therefore count - 2 to push focus
						// to the last tab/ array element
					},
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
		case INITIATE_AUTH_CLEANUP: {
			return {...state,
				mySnippets: {
					...INITIAL_STATE.mySnippets
				},
				currentSnippetMeta: {
					...INITIAL_STATE.currentSnippetMeta
				}
			}
		}	
		default:
			return state;
	}
}

export default snippets;
