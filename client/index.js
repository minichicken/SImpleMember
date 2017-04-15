import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import configureStore from '../shared/redux/store/configureStore';
import router from '../shared/redux/router';

const store = configureStore(window.__initialState__);
const element = document.getElementById('root');


match({ history: browserHistory, routes: router }, (err, redirect, props) => {
    render(
        <Provider store={store}>
            <Router {...props} />
        </Provider>,
        element
    );
});
