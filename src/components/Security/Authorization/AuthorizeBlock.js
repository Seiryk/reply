import React, {Component} from 'react'
import BaseAuthorize from './BaseAuthorize'

const AuthorizeBlock = (allowedRoles) =>
    (WrappedComponent) =>
        class AuthorizeBlock extends BaseAuthorize {
            render() {
                let hasAccess = this.hasAccess(allowedRoles);
                if (hasAccess === null) return null;

                if (hasAccess) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return null;
                }
            }
        };

export default AuthorizeBlock

