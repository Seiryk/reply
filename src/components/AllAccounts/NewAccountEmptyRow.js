import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Input } from 'antd';

import IconsCheckClose from '../UI/IconsCheckClose'

const NewAccountEmptyRow = ({inputChange, newName, newAPIkey, addNewAccount, closeEmptyRow }) => {
    return(
        <Row style={{marginTop: 50}} gutter={48}>
        <Col span={6}>
            <Input placeholder='Введите значение' name={'newName'} onChange={inputChange} value ={newName} />
        </Col>
        <Col span={6}>
            <Input placeholder='Введите значение' name={'newAPIkey'} onChange={inputChange} value = {newAPIkey} />
        </Col>
        <Col span={6}></Col>
        <IconsCheckClose addNew={addNewAccount} closeEmptyRow={closeEmptyRow} span={6} />
    </Row>
        )
}

export default NewAccountEmptyRow;

NewAccountEmptyRow.propTypes = {
    newName: PropTypes.string,
    newAPIkey: PropTypes.string,
    inputChange: PropTypes.func,
    addNewAccount: PropTypes.func,
    closeEmptyRow: PropTypes.func,
}