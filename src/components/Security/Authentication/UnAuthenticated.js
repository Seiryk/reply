import React, {Component} from 'react';
import {Button, Grid, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
// import {logIn} from '../../../AC';
import {parseJwt} from '../../../actions/index';
// import {BASE_URL} from "../../../constants";

class UnAuthenticated extends Component {
    isRedirecting = false;

    constructor(props) {
        super(props);
        this.processToken();
        const user = localStorage.getItem('user');
        if (!this.isRedirecting && user && window.location.pathname !== '/login') {
            // window.location.replace(BASE_URL);
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
                // ? localStorage.getItem('tokenRedirectUrl') : BASE_URL;

            this.isRedirecting = true;
            if (window.location.pathname !== '/login') {
                window.location.replace(redirectUrl);
            }
        }
    }

    logIn = (ev) => {
        ev.preventDefault();
        const {logIn} = this.props;
        // logIn();
    };

    render() {
        return (
            <Grid className={'fullPageHeight'} stretched verticalAlign='middle' columns={4} centered>
                <Grid.Row textAlign={'center'}>
                    <Grid.Column>
                        <div><Image centered size='medium' src={process.env.PUBLIC_URL + "/logo.svg"} /></div>
                        <br />
                        <div className='loginBtnWraper'>
                            <Button className='loginBtn' basic color='blue' content='Login' onClick={this.logIn}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // logIn
    }
}

export default connect(null, mapDispatchToProps)(UnAuthenticated)
