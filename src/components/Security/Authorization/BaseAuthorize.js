import React, {Component} from 'react'
import {connect} from 'react-redux'
import HasNoAccess from '../../Layout/HasNoAccess/HasNoAccess';


class BaseAuthorize extends Component {
    hasAccess = () => {
        const {userRoles} = this.props.user;
        const hasAccess = userRoles.includes(this.props.role);
        return hasAccess;
    }
    render() {
        if (this.hasAccess()) return this.props.children
        else return <HasNoAccess />
    }
}

export default connect((state) => ({
    user: state.authorization.user
}))(BaseAuthorize)
