import React from 'react';
import {StaticRouter} from 'react-router-dom';
import routes from '../routes';
import {renderToString} from 'react-dom/server';
import Header from '../components/Header';
import {Provider} from 'react-redux';
import {getServerStore} from '../store';
export default function (req, res) {
    let context = {};
    let html = renderToString(
        <Provider store={getServerStore()}>
            <StaticRouter context={context} location={req.path}>
                <>
                <Header/>
                <div className="container" style={{marginTop: 70}}>
                    {routes}
                </div>
                </>
            </StaticRouter>
        </Provider>
    );
    console.log(html)
    res.send(
        `
            <html>
                <head>
                    <title>ReactSSR</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                </head>
                <body>
                    <div id="root">${html}</div>
                    <script src="./client.js"></script>
                </body>
            </html>
        `
    );
}