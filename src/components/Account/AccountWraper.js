import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import Async from 'react-code-splitting';
import {addAccountIdToHeders} from '../../utils/additionalFunctions';

import Account from './Account'

import './styles/account.less'

const AddMailing = () => <Async load={import('../AddMailing/addMailing')} />;

const AccountWraper = ({match: {params: { accountId }}}) =>  {
    addAccountIdToHeders(accountId);
    return (
        <Switch>
            <Route path='/account/:accountId/mailing/edit/:id' exact component={AddMailing} />
            <Route path='/account/:accountId/mailing/add' exact component={AddMailing} />
            <Route path='/account/:accountId' component={Account} />
        </Switch>
    )
}
export default withRouter(AccountWraper)