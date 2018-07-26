import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import { Icon } from 'antd';
import UserDetails from '../userDetails/userDetails'
import { IsAdmin } from '../../Security/HasRole'
import '../styles/header.less'

class Header extends Component {
    render() {
        return (
            <header >
                <NavLink to='/' className='main-page'>Главная страница</NavLink>
                <div className='userDetails'>
                    <IsAdmin>
                        <NavLink to='/admin/access' ><Icon className="settings" type="setting"/></NavLink>
                    </IsAdmin>
                    <UserDetails userName={this.props.user.username} />
                </div>
            </header>
        )
    }
}
export default connect(state => ({
    user: state.authorization.user
}))(Header)