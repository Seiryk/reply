import React from 'react'
import {  Menu, Icon } from 'antd';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import PageNotFound from '../Layout/pageNotFound/pageNotFound';
import LogsList from './LogsList';
import AccessConfig from './AccessConfig';

import './styles/admin.less'


const AdmimPage = ({location: {pathname}}) =>  {
    let currentLinkArr = pathname.split('/');
    const currentLink = currentLinkArr[currentLinkArr.length - 1];
    const selectedKeys = [currentLink];
    const access = 'Управление доступом';
    const logs = 'Просмотр логов';
    return (
        <div>
            <nav >
                <Menu selectedKeys={selectedKeys} mode='horizontal'>
                    <Menu.Item key="access">
                        <NavLink to={`/admin/access`}>
                            <Icon type="usergroup-add" />{access}
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="logs">
                        <NavLink to={`/admin/logs`}>
                            <Icon type="profile" />{logs}
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </nav>
            <Switch>
                <Route path='/admin/access' component={AccessConfig} />
                <Route path='/admin/logs' component={LogsList} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
    )
}

export default withRouter(AdmimPage)