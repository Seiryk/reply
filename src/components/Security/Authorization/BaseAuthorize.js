import {Component} from 'react'
import PropTypes from 'prop-types'
import {getSessionUser} from '../../../selectors'

class BaseAuthorize extends Component {

    static contextTypes = {
        store: PropTypes.object
    };

    state = {
        userRoles: null
    }

    componentDidMount() {
        const user = getSessionUser(this.context.store.getState());
        if (user) {
            this.setState({
                userRoles: user.userRoles
            })
        }
    }

    hasAccess(allowedRoles) {
        const {userRoles} = this.state;
        if (userRoles === null) return null;
        let hasAccess = userRoles.filter((n) => allowedRoles.includes(n));
        return (hasAccess.length > 0);
    }

}

export default BaseAuthorize
