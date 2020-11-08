import { combineReducers } from 'redux';
import auth from './auth';
import snippets from './snippets';
import ui from './ui';
import {reducer as notifications } from 'react-notification-system-redux';

const rootReducer = combineReducers({ui, auth, snippets, notifications});

export default rootReducer;