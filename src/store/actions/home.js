import * as types from "../action-types";
import axios from 'axios';

export default {
    getHomeList() {
        return function (dispatch, getState, request) {
            // 使用node服务器代理api服务器
            // 如果是服务器端读数据，则直接访问API服务器4000
            // 客户端则要访问3000的node服务器，让node服务器帮我们访问
            return request.get('/api/users').then(function (result) {
               let list = result.data;
               dispatch({
                   type: types.SET_HOME_LIST,
                   payload: list
               });
            });
        }
    }
}