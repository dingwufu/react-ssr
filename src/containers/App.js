import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import actions from '../store/actions/session';
import {renderRoutes, matchRoutes} from 'react-router-config';
import styles from './App.css';
import withStyles from '../withStyles';

class App extends Component {
    render() {
        return (
            <>
            <Header staticContext={this.props.staticContext}/>
            <div className="container" className={styles.app}>
                {renderRoutes(this.props.route.routes)}
            </div>
            </>
        )
    }
}
App.loadData = function (store) {
    return store.dispatch(actions.getUser());
}
export default withStyles(App, styles);
