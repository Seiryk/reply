import React, {Component} from 'react';
import { Button } from 'antd'
import {logIn} from '../../../actions/index';
import {parseJwt} from '../../../utils/additionalFunctions';
import '../../styles/app.less'


class UnAuthenticated extends Component {
    constructor(props) {
        super(props);
        this.processToken();
        const user = localStorage.getItem('user');
        if (user && props.location.pathname === '/login') {
            props.history.push('/');
        }
    }

    /**
     * Обработка токена, если он есть в GET параметрах
     */
    processToken() {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('token') !== null) {
            let token = searchParams.get("token");

            //Добавляем токен в localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', parseJwt(token));
            
            let redirectUrl = localStorage.getItem('tokenRedirectUrl')
                ? localStorage.getItem('tokenRedirectUrl') : '/';

                this.props.history.push(redirectUrl);
        }
    }

    logIn = () => logIn();

    render() {
        return (
                <div className='unAutheticatedPageWraper'>
                    <p>ReplyService</p>
                    <Button onClick={this.logIn} >Login</Button>
                </div>
        )
    }
}
export default UnAuthenticated
