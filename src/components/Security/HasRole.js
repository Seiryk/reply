import { Component } from 'react';
import {connect} from 'react-redux';
import {ROLE_ADMIN, ROLE_RESP} from "../../utils/constants";

class HasRole extends Component {

    render() {
        const { children, userRoles, requiredRole } = this.props;
        if (!userRoles.includes(requiredRole)) return null;
        return children;
    }

}
const getMapStateToProps = (extendWith = {}) => state => {
    return {
        userRoles: state.authorization.user.userRoles,
        ...extendWith
    };
};


export default connect(getMapStateToProps())(HasRole);
export const IsAdmin = connect(getMapStateToProps({requiredRole: ROLE_ADMIN}))(HasRole);
export const IsResp = connect(getMapStateToProps({requiredRole: ROLE_RESP}))(HasRole);
