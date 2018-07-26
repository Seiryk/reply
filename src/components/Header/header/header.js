import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd';
import UserDetails from '../userDetails/userDetails'
import { IsAdmin } from '../../Security/HasRole'
import '../styles/header.less'

export default class Header extends Component {
    render() {
        return (
            <header >
                <NavLink to='/' className='main-page'>Главная страница</NavLink>
                <div className='userDetails'>
                    <IsAdmin>
                        <NavLink to='/admin/access' ><Icon className="settings" type="setting"/></NavLink>
                    </IsAdmin>
                    <UserDetails />
                </div>
            </header>
        )
    }
}
