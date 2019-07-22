import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import routes from '../routes';
import Header from '../components/Header';
import {Provider} from 'react-redux';
import {getClientStore} from '../store';
// 服务器端以返回渲染，不再重新渲染 只绑定事件等。。
ReactDOM.hydrate(
    <Provider store={getClientStore()}>
        <BrowserRouter>
            <>
            <Header/>
            <div className="container" style={{marginTop: 70}}>
                {routes}
            </div>
            </>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);