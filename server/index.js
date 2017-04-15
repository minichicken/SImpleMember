import Express from 'express';
import path from 'path';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server';
import router from '../shared/redux/router';
import configureStore from '../shared/redux/store/configureStore';

const app = Express();
const port = process.env.port || 3000;
const renderFullPage = (html, initialState) => {
    return `
        <!Doctype html>
        <html>
            <head>
               <meta charset='utf-8'>
                <title>${initialState.title.title}</title>
            </head>
            <body>
                <div id='root'>${html}</div>
                <script>window.__initialState__ = ${JSON.stringify(initialState)}</script>
                <script src='bundle.js'></script>
            </body>
        </html>
    `;
}

app.set('port', port);
app.use(Express.static(path.resolve(__dirname, '../static')));
app.use((req, res, next) => {
    match({ routes: router, location: req.url }, (err, redirectionLocation, renderProps) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (redirectionLocation) {
            return res.redirect(302, redirectionLocation.pathname + redirectionLocation.search);
        }
        if (!renderProps) {
            return next();
        }
        
        global.navigator = global.navigator || {};
        global.navigator.userAgent = req.headers['user-agent'] || 'all';

        const store = configureStore({ members: [] });
        const initView = renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );
        return res.status(200).end(renderFullPage(initView, store.getState()));
    });
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`The server started... ${port}`);
})