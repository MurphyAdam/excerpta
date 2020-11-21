import { theme, darkModeOn } from '../../config/ui'
import { SET_APP_THEME, UPDATE_EDITOR_PREFS } from '../constants/ui'
import { SET_CURRENT_SNIPPET_META, FETCH_SNIPPETS_SUCCESS } from '../constants/snippets';

const INITIAL_STATE = {
		theme: theme,
		darkModeOn: darkModeOn,
		editor: {
	    theme: 'monokai',
	    mode: undefined,
	    font: 14,
	  }
};

function app(state=INITIAL_STATE, action) {
	switch (action.type){
		// app theme
		case SET_APP_THEME: {
			return {...state, 
					theme: action.payload.theme, 
					darkModeOn: action.payload.darkModeOn
				};
		}
		case UPDATE_EDITOR_PREFS: {
			return {...state, 
				editor: {...state.editor, ...action.payload},
			}
		}
		// the user can change language mode. for example python mode instead of java mode,
		// for current file, but we would like when the user navigates to another file, for example 
		// a bash file, to change the mode automatically to the file type, instead of user doing so
		// so below we listen to SET_CURRENT_SNIPPET_META which occurs everytime a user navigates from file 
		// to file, or has created/ deleted new files
		case SET_CURRENT_SNIPPET_META: {
			const { mode = state.editor.mode } = action.payload;
			return {...state, 
				editor: {...state.editor, mode
				}
			}	
		}
		case FETCH_SNIPPETS_SUCCESS: {
			return {...state, 
				editor: {...state.editor, mode: action.payload.results[0].language}
			}
		}
		default:
			return state;
	}
}

export default app;