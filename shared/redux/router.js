import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import NotFoundPage from '../containers/NotFoundPage';
import MemberContainder from '../containers/MemberContainer';

const router = (
    <Route path='/' component={App}>
        <IndexRoute component={MemberContainder} />
        <Route path='*' component={NotFoundPage} />
    </Route>
);

export default router;