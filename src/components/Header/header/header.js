import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd';
import UserDetails from '../userDetails/userDetails'
import '../styles/header.less'

export default class Header extends Component {
    render() {
        return (
            <header >
                <NavLink to='/' className='main-page'>Главная страница</NavLink>
                <div className='userDetails'>
                    <Icon className="settings" type="setting"/>
                    <UserDetails />
                </div>
            </header>
        )
    }
}