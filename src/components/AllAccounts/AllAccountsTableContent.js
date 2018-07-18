import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon, Input, Button } from 'antd'


const AllAccountsTableContent = (props) =>  {
        const {
            el,
            values,
            openAccount,
            inputChange,
            deleteAccount,
            editAccount,
            makeEditable,
            closeEditMode
        } = props;
        return (
            <div className='rowWraper'>
                <Row gutter={48}>
                    <Col span={6}>
                        {
                            el.edit ? <Input name={'name'} onChange={inputChange} value = {values.name} /> : <p>{el.name}</p>
                        }
                    </Col>
                    <Col span={6}>
                        {
                            el.edit ? <Input name={'APIkey'} onChange={inputChange} value = {values.APIkey} /> : <p>{el.APIkey}</p>
                        }
                    </Col>
                    <Col span={6}><Button onClick={() => openAccount(el)} disabled={el.edit}>Войти</Button></Col>
                    <Col span={6}>
                        <Icon
                            className='iconStyle'
                            type={el.edit ? "check" : "edit"} 
                            onClick={() => el.edit ? editAccount(el): makeEditable(el)} />
                        <Icon 
                            style={{marginLeft: 10}}
                            className='iconStyle'
                            type={el.edit ? "close" : "delete"} 
                            onClick={() => el.edit? closeEditMode(): deleteAccount(el) } />
                    </Col>
                </Row>
            </div>
        )
}

export default AllAccountsTableContent;

AllAccountsTableContent.propTypes = {
    el: PropTypes.object,
    values: PropTypes.object,
    openAccount: PropTypes.func,
    inputChange: PropTypes.func,
    deleteAccount: PropTypes.func,
    editAccount: PropTypes.func,
    makeEditable: PropTypes.func,
    closeEditMode: PropTypes.func,
}