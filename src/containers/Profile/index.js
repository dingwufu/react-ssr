import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
class Profile extends Component {
    render() {
        return (
            this.props.user ? <div className="row">
                <div className="col-md-6 col-md-offset-6">
                    个人中心
                </div>
            </div> :
            <Redirect to="/login" />
        )
    }
}
Profile = connect(
    state => state.session
)(Profile);
export default Profile;