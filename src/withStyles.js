import React, {Component} from 'react';

export default function withStyles(OriginalComponent, styles) {
    class ProxyComponent extends Component {
        componentWillMount() {
            // _getCss 获取处理后的css源代码  isomorphic-style-loader
            if(this.props.staticContext) {
                this.props.staticContext.csses.push(styles._getCss());
            }
        }
        render() {
            return <OriginalComponent {...this.props} />
        }
    }
    return ProxyComponent;
}