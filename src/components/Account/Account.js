import React from 'react'
import { Menu, Icon } from 'antd';
import Async from 'react-code-splitting';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import MailingList from './MailingList/MailingList';
import PageNotFound from '../Layout/pageNotFound/pageNotFound';

import './styles/account.less'

const VariablesList = (props) => <Async load={import('./VariableList/VariablesList')} />;

const Account = (props) =>  {
    const {match: {params: { accountId }}, history, location: {pathname}} = props;
    let currentLinkArr = pathname.split('/');
    const currentLink = currentLinkArr[currentLinkArr.length - 1];
    const selectedKeys = [currentLink];
    const mailing = 'Список рассылок';
    const variables = 'Настройка пользовательских полей';
    return (
        <div>
            <nav >
                <Menu selectedKeys={selectedKeys} mode='horizontal'>
                    <Menu.Item key="mailinglist">
                        <NavLink to={`/account/${accountId}/mailinglist`}>
                            <Icon type="mail" />{mailing}
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="variablelist">
                        <NavLink to={`/account/${accountId}/variablelist`}>
                            <Icon type="setting" />{variables}
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </nav>
            <Switch>
                <Route path='/account/:accountId/mailinglist' render={() => <MailingList history={history} title={mailing} accountId={accountId} />} />
                <Route path='/account/:accountId/variablelist' render={() => <VariablesList title={variables} accountId={accountId} /> } />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
    )
}

export default withRouter(Account)