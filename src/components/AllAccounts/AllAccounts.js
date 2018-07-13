import React, { Component } from 'react'
import { Icon, Input, Button, Row, Col } from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import notification from '../Layout/notification/notification';
import Spiner from '../Layout/Spiner/spiner';

import { createAccount, editAccount, deleteAccount, loadAllAccounts } from '../../actions/index'
import { getAllAccountsState } from '../../selectors/index'
import { validation, deleteSelectedItem, makeFieldEditable, closeEditMode } from '../../utils/additionalFunctions'

import './style/AllAccounts.less'

class AllAccountsPage extends Component {
    state = {
        allAccountsList: [],
        APIkey: '',
        name: '',
        newName: '',
        newAPIkey: '',
    }
    renderAccauntsList = (allAccountsArr) => {
        const { name, APIkey } = this.state;
        return allAccountsArr.map(el => (
            <div key={el.APIkey} className='rowWraper'>
                <Row gutter={48}>
                    <Col span={6}>
                        {
                            el.edit ? <Input name={'name'} onChange={this.inputChange} value = {name} /> : <p>{el.name}</p>
                        }
                    </Col>
                    <Col span={6}>
                        {
                            el.edit ? <Input name={'APIkey'} onChange={this.inputChange} value = {APIkey} /> : <p>{el.APIkey}</p>
                        }
                    </Col>
                    <Col span={6}><Button onClick={() => this.openAccount(el)} disabled={el.edit}>Войти</Button></Col>
                    <Col span={6}>
                        <Icon
                            className='iconStyle'
                            type={el.edit ? "close" : "edit"} 
                            onClick={(e) => el.edit? this.closeEditMode(): this.makeEditable(el)} />
                        <Icon 
                            style={{marginLeft: 10}}
                            className='iconStyle'
                            type={el.edit ? "check" : "delete"} 
                            onClick={(e) => el.edit? this.editAccount(el): this.deleteAccount(el) } />
                    </Col>
                </Row>
            </div>
        ))
    }
    openAccount = ({id}) => {
        this.props.history.push(`/account/${id}/mailinglist`)
    }
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
            notification('error', 'Поля пустые или не соответствуют формату');
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
        }
        else notification('error', 'Поля пустые или не соответствуют формату');
    }

    makeEditable = ({id}) => {
        makeFieldEditable(id, this, 'allAccountsList', 'name', 'APIkey');
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            allAccountsList: nextProps.allAccountsState.allAccountsList,
            newAPIkey: '',
            newName: ''
        })
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
        const { allAccountsList, newAPIkey, newName  } = this.state;
        const { loading  } = this.props.allAccountsState;
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
                                                    <div className='rowWraper'>
                                                        <Row onClick={this.closeEditMode} gutter={48}>
                                                            <Col span={6}>
                                                                <Input name={'newName'} onChange={this.inputChange} value ={newName} />
                                                            </Col>
                                                            <Col span={6}>
                                                                <Input name={'newAPIkey'} onChange={this.inputChange} value = {newAPIkey} />
                                                            </Col>
                                                            <Col span={6}></Col>
                                                            <Col span={6}>
                                                                <Icon 
                                                                    className='iconStyle'  
                                                                    type="plus-circle-o"
                                                                    onClick={(e) => this.addNewAccount()} />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </React.Fragment>}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        allAccountsState: getAllAccountsState(state),
    }
}

export default withRouter(connect(mapStateToProps, {
    createAccount,
    editAccount,
    loadAllAccounts,
    deleteAccount
})(AllAccountsPage));