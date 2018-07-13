import React from 'react'
import { Row, Col } from 'antd';
import Async from 'react-code-splitting';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import MailingList from './MailingList/MailingList';
import PageNotFound from '../Layout/pageNotFound/pageNotFound';

import './styles/account.less'

const VariablesList = () => <Async load={import('./VariableList/VariablesList')} />;

const Account = ({match: {params: { id }}, history}) =>  {
    const mailing = 'Список рассылок';
    const variables = 'Настройка пользовательских полей';
    return (
        <div>
            <nav className='accountNavMenu'>
                <Row>
                    <Col span={12}>
                        <NavLink className='accountNavItem' activeClassName='accountNavItemActive' to={`/account/${id}/mailinglist`}>
                            {mailing}
                        </NavLink>
                    </Col>
                    <Col span={12}>
                        <NavLink className='accountNavItem' activeClassName='accountNavItemActive' to={`/account/${id}/variablelist`}>
                            {variables}
                        </NavLink>
                    </Col>
                </Row>
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