import React from 'react';
import BaseAuthorize from './BaseAuthorize';
import {ROLE_ADMIN, ROLE_USER} from "../../../utils/constants";


const AuthorizePage = (role) => (WrapedComponent) => {
    return class AuthorizePage extends React.Component {
        render() {
            return (
                <BaseAuthorize role={role}>
                    <WrapedComponent />
                </BaseAuthorize>
            )
        }
    }
}

export const authorizePageUser = (WrapedComponent) => AuthorizePage(ROLE_USER)(WrapedComponent);
export const authorizePageAdmin = (WrapedComponent) => AuthorizePage(ROLE_ADMIN)(WrapedComponent);


