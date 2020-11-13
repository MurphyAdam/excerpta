import { FETCH_SNIPPET,
	FETCH_SNIPPET_SUCCESS, 
	FETCH_SNIPPET_FAILURE,
	REFETCH_SNIPPET_SUCCESS,
	DELETE_SNIPPET_SUCCESS,
	CREATE_SNIPPET,
	UPDATE_SNIPPET,
	 } from '../constants/snippets';
import { INITIATE_AUTH_CLEANUP } from '../constants/auth';
import { filterArrayWithId, concatArrayOfObjectsAndSortWithDateAsc, updateObjectInArrayWithId } from '../methods';

const INITIAL_STATE = {
		snippets: [ 
			{
			    url: "http://127.0.0.1:8000/api/snippets/1/?format=json",
			    id: 1,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/1/highlight/?format=json",
			    title: "Fullstack web developer",
			    code: "urlpatterns += [\r\n    path('api-auth/', include('rest_framework.urls')),\r\n]",
			    linenos: false,
			    language: "python",
			    style: "colorful"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/2/?format=json",
			    id: 2,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/2/highlight/?format=json",
			    title: "Permissions",
			    code: 'from rest_framework import permissions\r\n\r\n\r\nclass IsOwnerOrReadOnly(permissions.BasePermission):\r\n    """\r\n    Custom permission to only allow owners of an object to edit it.\r\n    """\r\n\r\n    def has_object_permission(self, request, view, obj):\r\n        # Read permissions are allowed to any request,\r\n        # so we\'ll always allow GET, HEAD or OPTIONS requests.\r\n        if request.method in permissions.SAFE_METHODS:\r\n            return True\r\n\r\n        # Write permissions are only allowed to the owner of the snippet.\r\n        return obj.owner == request.user',
			    linenos: false,
			    language: "python",
			    style: "monokai"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/3/?format=json",
			    id: 3,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/3/highlight/?format=json",
			    title: "Javascript test",//eslint-disable-next-line
			    code: "<script>alert(1);<\/script>",
			    linenos: true,
			    language: "js",
			    style: "monokai"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/4/?format=json",
			    id: 4,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/4/highlight/?format=json",
			    title: "Javascript Arrays",
			    code: 'var vegetables = [\'Cabbage\', \'Turnip\', \'Radish\', \'Carrot\'];\r\nconsole.log(vegetables); \r\n// ["Cabbage", "Turnip", "Radish", "Carrot"]\r\n\r\nvar pos = 1, n = 2;\r\n\r\nvar removedItems = vegetables.splice(pos, n); \r\n// this is how to remove items, n defines the number of items to be removed,\r\n// from that position(pos) onward to the end of array.\r\n\r\nconsole.log(vegetables); \r\n// ["Cabbage", "Carrot"] (the original array is changed)\r\n\r\nconsole.log(removedItems); \r\n// ["Turnip", "Radish"]',
			    linenos: true,
			    language: "js",
			    style: "emacs"
			}, {
			    url: "http://127.0.0.1:8000/api/snippets/5/?format=json",
			    id: 5,
			    owner: "majdi",
			    edited: false,
			    highlight: "http://127.0.0.1:8000/api/snippets/5/highlight/?format=json",
			    title: "ikhan",
			    code: "print(12346)",
			    linenos: false,
			    language: "python",
			    style: "friendly"
			} 
		],
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
		case UPDATE_SNIPPET: {
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
