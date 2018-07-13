import { Component } from 'react';
import {connect} from 'react-redux';
import {ROLE_ADMIN, ROLE_RESP} from "../../constants";
import {getUserRoles} from "../../selectors/users";

class HasRole extends Component {

    render() {
        const { children, currentUserRole, requiredRole } = this.props;
        if (!currentUserRole.includes(requiredRole)) return null;
        return children;
    }

}
const getMapStateToProps = (extendWith = {}) => state => {
    return {
        currentUserRole: getUserRoles(state),
        ...extendWith
    };
};


export default connect(getMapStateToProps())(HasRole);
export const IsAdmin = connect(getMapStateToProps({requiredRole: ROLE_ADMIN}))(HasRole);
export const IsResp = connect(getMapStateToProps({requiredRole: ROLE_RESP}))(HasRole);
