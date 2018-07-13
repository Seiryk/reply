import React, { Component } from 'react'
import { Icon } from 'antd';
import './footer.less'

export default class Header extends Component {
    render() {
        return (
            <footer >
                <Icon type='copyright'/> <span>Reply Service</span> since 2018
            </footer>
        )
    }
}
