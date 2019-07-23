import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import routes from '../routes';
import Header from '../components/Header';
import {Provider} from 'react-redux';
import {getClientStore} from '../store';
// renderRoutes 渲染多久路由  matchRoutes 实现路由匹配
import {renderRoutes, matchRoutes} from 'react-router-config';
// 服务器端以返回渲染，不再重新渲染 只绑定事件等。。
ReactDOM.hydrate(
    <Provider store={getClientStore()}>
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);