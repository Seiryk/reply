import Async from 'react-code-splitting';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {authenticated} from '../../../actions/index';
import PageNotFound from "../../Layout/pageNotFound/pageNotFound";
import Header from '../../Header/header/header'
import Footer from '../../Footer/footer'
import AllAccounts from '../../AllAccounts/AllAccounts'
import {addBaseAxiosSettings} from '../../../utils/additionalFunctions'
import {authorizePageUser, authorizePageAdmin} from '../Authorization/AuthorizePage'
const AccountWraper = () => <Async load={import('../../Account/AccountWraper')} />;
const AdminPage = () => <Async load={import('../../Admin/AdminPage')} />;

const RouteAccountWraper = authorizePageUser(AccountWraper);
const RouteAllAccounts = authorizePageUser(AllAccounts);
const RouteAdminPage = authorizePageAdmin(AdminPage);


class Authenticated extends Component {
    constructor(props) {
        super(props);
        if (!this.checkUserIsAunthenticated()) {
            this.redirectToLogin();
        }
    }

    checkUserIsAunthenticated = () => {
        const user = localStorage.getItem('user');
        return user && JSON.parse(user).exp > (Date.now() / 1000 | 0);
    };

    redirectToLogin = () => {
        const curHref = this.props.location.pathname;
        window.localStorage.setItem('tokenRedirectUrl', curHref);
        window.localStorage.removeItem('user');
        this.props.history.push('/login');
    };

    componentWillMount() {
        const {authenticated} = this.props;
        if (this.checkUserIsAunthenticated()) {
            authenticated();
            addBaseAxiosSettings();
        } 
    }

    render() {
        if (!this.checkUserIsAunthenticated()) {
            return null
        }
        return (
            <div>
                <Header />
                <section>
                    <Switch>
                        <Route path="/account/:accountId" component={RouteAccountWraper}/>
                        <Route path="/admin/" component={RouteAdminPage}/>
                        <Route path="/" exact component={RouteAllAccounts}/>
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </section>
                <Footer />
            </div>
            )
    }

}

export default connect(null, {authenticated})(Authenticated)
