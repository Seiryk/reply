import React from 'react'
import { Menu, Icon } from 'antd';
import Async from 'react-code-splitting';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import MailingList from './MailingList/MailingList';
import PageNotFound from '../Layout/pageNotFound/pageNotFound';

import './styles/account.less'

const VariablesList = () => <Async load={import('./VariableList/VariablesList')} />;

const Account = ({match: {params: { id }}, history, location: {pathname}}) =>  {
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
                        <NavLink to={`/account/${id}/mailinglist`}>
                            <Icon type="mail" />{mailing}
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="variablelist">
                        <NavLink to={`/account/${id}/variablelist`}>
                            <Icon type="setting" />{variables}
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </nav>
            <Switch>
                <Route path='/account/:id/mailinglist' render={() => <MailingList history={history} title={mailing} id={id} />} />
                <Route path='/account/:id/variablelist' render={() => <VariablesList title={variables} id={id} /> } />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
    )
}

export default withRouter(Account)