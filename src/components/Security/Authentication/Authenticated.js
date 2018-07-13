// import {BASE_URL} from '../../../constants';
import Async from 'react-code-splitting';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
// import {authenticated, unAuthenticated} from '../../../AC';
import PageNotFound from "../../Layout/pageNotFound/pageNotFound";
import Header from '../../Header/header/header'
import Footer from '../../Footer/footer'
import AllAccounts from '../../AllAccounts/AllAccounts'
const Account = () => <Async load={import('../../Account/Account')} />;
const AddMailing = () => <Async load={import('../../AddMailing/addMailing')} />;


class Authenticated extends Component {
    // constructor(props) {
    //     super(props);
    //     if (!this.checkUserIsAunthenticated()) {
    //         this.redirectToLogin();
    //     }
    // }

    // checkUserIsAunthenticated = () => {
    //     const user = localStorage.getItem('user');
    //     return user && JSON.parse(user).exp > (Date.now() / 1000 | 0);
    // };

    // redirectToLogin = () => {
    //     const curHref = window.location.href;

    //     if (!window.localStorage.getItem('tokenRedirectUrl')) {
    //         window.localStorage.setItem('tokenRedirectUrl', curHref);
    //     }
    //     let searchParams = new URLSearchParams(window.location.search);
    //     if (searchParams.get('token') === null && window.location.pathname !== '/login') {
    //         window.localStorage.setItem('tokenRedirectUrl', curHref);
    //         // window.location.replace(BASE_URL + '/login');
    //     }
    // };

    // componentWillMount() {
    //     const {authenticated} = this.props;
    //     if (this.checkUserIsAunthenticated()) {
    //         authenticated();
    //     }
    // }

    render() {
        // if (!this.checkUserIsAunthenticated()) {
        //     return null;
        // }

        return (
            <div>
                <Header />
                <section>
                    <Switch>
                        <Route path="/account/:id" component={Account}/>
                        <Route path='/mailing/add' render={() => <AddMailing /> } />
                        <Route path='/mailing/edit/:id' render={() => <AddMailing /> } />
                        <Route path="/" exact component={AllAccounts}/>
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </section>
                <Footer />
            </div>
        )
    }

}

export default connect(null, )(Authenticated)
