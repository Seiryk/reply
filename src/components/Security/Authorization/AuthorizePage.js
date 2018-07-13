import React from 'react';
import BaseAuthorize from './BaseAuthorize';
import HasNotAccess from '../../Layout/HasNotAccess';
import {ROLE_ADMIN, ROLE_RESP} from "../../../constants";

const AuthorizePage = (allowedRoles) => (WrappedComponent) =>
        class AuthorizePage extends BaseAuthorize {
            
            render() {
                let hasAccess = this.hasAccess(allowedRoles);

                if (hasAccess) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return (<HasNotAccess />)
                }
            }
        };

export default AuthorizePage;

export const AutorizePageAdmin = (WrappedComponent) => AuthorizePage([ROLE_ADMIN])(WrappedComponent);
export const AutorizePageResp = (WrappedComponent) => AuthorizePage([ROLE_RESP])(WrappedComponent);


