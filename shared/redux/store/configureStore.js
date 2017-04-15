import thunk from 'redux-thunk';
import manager from '../reducer/manager';
import reducer from '../reducer';
import { createStore, applyMiddleware } from 'redux';

export default function configureStore(initialState = {}) {
    const enhancer = applyMiddleware(thunk);
    return createStore(reducer, initialState, enhancer);
}