import React from 'react';
import {StaticRouter, Route, matchPath} from 'react-router-dom';
import routes from '../routes';
import {renderToString} from 'react-dom/server';
import Header from '../components/Header';
import {Provider} from 'react-redux';
import {getServerStore} from '../store';
import {renderRoutes, matchRoutes} from 'react-router-config';
export default function (req, res) {
    // csses收集每个组件引用的样式
    let context = {csses: []};
    let store = getServerStore(req);
    // 获取要渲染的组件 matchPath是路由提供工具方法，可以用来判断路径和路由对象是否匹配
    // matchRoutes 处理多久路由匹配
    let matchedRoutes = matchRoutes(routes, req.path)
    // routes.filter(route => (
    //     matchPath(req.path, route)
    // ));
    let promise = [];
    matchedRoutes.forEach(item => {
        if (item.route.loadData) {
            // 不管成功和失败，都变成成功就可以
            promise.push(new Promise(function (resolve) {
                return item.route.loadData(store).then(resolve, resolve);
            }));
        }
    })
    Promise.all(promise).then(function () {
        let html = renderToString(
            <Provider store={store}>
                <StaticRouter context={context} location={req.path}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>
        );
        let cssStr = context.csses.join('\n');
        // 使用Redirect组件重定向，StaticRouter 会向context添加action
        if(context.action === 'REPLACE') {
            res.redirect(302, context.url);
        }else if(context.notFound) {
            res.statusCode = 404;
        }
        res.send(
            `
                <html>
                    <head>
                        <title>ReactSSR</title>
                        <style>${cssStr}</style>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                    </head>
                    <body>
                        <div id="root">${html}</div>
                        <script>
                            window.context = {
                                state: ${JSON.stringify(store.getState())}
                            }
                        </script>
                        <script src="./client.js"></script>
                    </body>
                </html>
            `
        );
    })
}