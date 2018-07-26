import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd';
import { logOut } from '../../../actions/authorizationActions'


const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink onClick={() => logOut()} to='/login'>Выйти</NavLink>
      </Menu.Item>
    </Menu>
  );

const userDetails = (props) => {
    return(
        <Dropdown overlay={menu} trigger={['click']}>
            <p className='userName'>
                {props.userName} <Icon style={{color: 'white'}} type="down" />
            </p>
        </Dropdown>
    )
}

export default userDetails