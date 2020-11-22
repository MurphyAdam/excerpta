import { setThemeCookie } from '../../config/ui';
import { SET_APP_THEME, UPDATE_EDITOR_PREFS } from '../constants/ui';
import { ActionCreatorFactory } from '../methods';


const updateEditorPropsAction = data => ActionCreatorFactory(UPDATE_EDITOR_PREFS, data);

export function updateEditorPreferences(editorProps) {
	return (dispatch) => {
		dispatch(updateEditorPropsAction(editorProps));
	}
}

export function SetAppTheme(theme) {
	setThemeCookie(theme.theme);
	return {
		type: SET_APP_THEME,
		payload: theme
	}
}
