import { combineReducers } from 'redux';
import manager from './manager';
import title from './title';

const reducers = combineReducers({
    members: manager,
    title: title
});

export default reducers;