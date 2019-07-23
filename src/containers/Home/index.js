import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../store/actions/home';
class Home extends Component {
    componentWillMount() {
        if (this.props.list.length === 0) {
            this.props.getHomeList();
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <ul className="list-group">
                        {
                            this.props.list.map(item => (
                                <li key={item.id} className="list-group-item">{item.name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
Home = connect(
    state => state.home,
    actions
)(Home);
// 此方法用来服务端渲染，异步加载数据放在仓库中去
Home.loadData = function (store) {
    // store.dispatch => 返回actions.getHomeList() (即返回一个函数) => redux-thunk 执行函数返回 axios.get即一个Promise
    return store.dispatch(actions.getHomeList());
}
export default Home;