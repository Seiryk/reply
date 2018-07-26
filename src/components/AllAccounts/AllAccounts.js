import React, { Component } from 'react'
import { Row, Col } from 'antd';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {error, emptyError, formatError} from '../../utils/constants'
import notification from '../Layout/notification/notification';
import Spiner from '../Layout/Spiner/spiner';
import NewAccountEmptyRow from './NewAccountEmptyRow';
import AllAccountsTableContent from './AllAccountsTableContent';
import AddBtn from '../UI/addButton';

import { createAccount, editAccount, deleteAccount, loadAllAccounts } from '../../actions/index'
import { validation, deleteSelectedItem, makeFieldEditable, closeEditMode, addAccountIdToHeders } from '../../utils/additionalFunctions'

import './style/AllAccounts.less'

class AllAccountsPage extends Component {
    state = {
        allAccountsList: [],
        APIkey: '',
        name: '',
        newName: '',
        newAPIkey: '',
        show: false
    }
    renderAccauntsList = (allAccountsArr) => {
        return allAccountsArr.map(el => (
                <AllAccountsTableContent 
                    key={el.APIkey}
                    el={el}
                    values={this.state}
                    inputChange={this.inputChange}
                    openAccount={this.openAccount}
                    deleteAccount={this.deleteAccount}
                    makeEditable={this.makeEditable}
                    editAccount={this.editAccount}
                    closeEditMode={this.closeEditMode}
                />
        ))
    }
    openAccount = ({id}) => {
        this.props.history.push(`/account/${id}/mailinglist`)
        addAccountIdToHeders(id);
    }

    openEmptyRow = () => this.setState({ show: true });

    closeEmptyRow = () => this.setState({ show: false, newAPIkey: '', newName: '' });

    deleteAccount = ({id}) => {
        const message = 'аккаунт';
        deleteSelectedItem(id, message, this, this.props.deleteAccount);
    }

    editAccount = (el) => {
        const { name, APIkey  } = this.state;
        const trimName = name.trim();
        const trimAPIkey = APIkey.trim();
        const valid = validation(trimName)
        if ( !trimName.length || !trimAPIkey.length || !valid ) {
            notification(error, emptyError + formatError);
        }
        else if (trimName !== el.name || trimAPIkey !== el.APIkey) {
            this.props.editAccount({name: trimName, APIkey: trimAPIkey, id: el.id});
        } else this.closeEditMode()
    }

    addNewAccount = () => {
        const { newAPIkey, newName } = this.state;
        const trimNewAPIkey = newAPIkey.trim();
        const trimNewName = newName.trim();
        const valid = validation(trimNewName);
        if ( trimNewName.length && trimNewAPIkey.length && valid ) {
            this.props.createAccount({name: trimNewName, APIkey: trimNewAPIkey})
            this.setState({
                newAPIkey: '',
                newName: '',
                show: true
            })
        }
        else notification(error, emptyError + formatError);
    }

    makeEditable = ({id}) => {
        makeFieldEditable(id, this, 'allAccountsList', 'name', 'APIkey');
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({allAccountsList: nextProps.allAccountsList})
    }
    closeEditMode = () => {
        closeEditMode(this, 'allAccountsList')
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.props.loadAllAccounts()
    }

    render() {
        const { allAccountsList, newAPIkey, newName, show } = this.state;
        const { loading  } = this.props;
        return (
            <div>
                {
                    loading ? <Spiner /> : <React.Fragment>
                                                <h1 className='title'>Привязка аккаунтов Reply</h1>
                                                <div className='tableWraper'>
                                                    <Row gutter={48}>
                                                        <Col span={6}><span className='tableFieldName'>Имя аккаунта</span></Col>
                                                        <Col span={6}><span className='tableFieldName'>API key</span></Col>
                                                    </Row>
                                                    {
                                                        this.renderAccauntsList(allAccountsList)
                                                    }
                                                    {show || !allAccountsList.length ? 
                                                    <NewAccountEmptyRow 
                                                    inputChange={this.inputChange}
                                                    addNewAccount={this.addNewAccount}
                                                    closeEmptyRow={this.closeEmptyRow}
                                                    newName={newName}
                                                    newAPIkey={newAPIkey}
                                                    /> :
                                                    <AddBtn addFunc={this.openEmptyRow} offset={22} />}
                                                </div>
                                            </React.Fragment>}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        allAccountsList: state.allAccounts.allAccountsList,
        loading: state.allAccounts.loading,
    }
}

export default withRouter(connect(mapStateToProps, {
    createAccount,
    editAccount,
    loadAllAccounts,
    deleteAccount
})(AllAccountsPage));

AllAccountsPage.propTypes = {
    loading: PropTypes.bool,
    allAccountsList: PropTypes.array,
    createAccount: PropTypes.func,
    loadAllAccounts: PropTypes.func,
    editAccount: PropTypes.func,
    deleteAccount: PropTypes.func,
}