import React, { Component } from 'react'
import { Row, Col, Icon, Input } from 'antd'
import Dropdown from '../UI/dropdown'


export default class emptyRow extends Component {
    render() {
        const {
            companies,
            values,
            addNewBinding,
            closeEmptyBindingRow,
            changeHandlerForNewVals
        } = this.props;
        return (
            <div style={{marginTop: 50}} className='conditionRowWrapper'>
                <Row className='conditionRowWrapper'>
                    <Col offset={4} span={4}>
                        <Input 
                            type='number'
                            name='newDelay'
                            placeholder={'Задержка'}
                            onChange={(e) => changeHandlerForNewVals(e.target.value, e.target.name )}
                            value = {values.newDelay} />
                    </Col>
                    <Col offset={4} span={4}>
                        <Dropdown 
                            name='newCompany'
                            defaultValue={values.newCompany} 
                            options={companies}
                            dropdownHandleChange={changeHandlerForNewVals}
                            width={200}/>
                    </Col>
                    <Col offset={2} span={2}>
                        <Icon style={{marginLeft: 3}} onClick={addNewBinding}  className='iconStyle' type='check' />
                        <Icon style={{marginLeft: 10}} onClick={closeEmptyBindingRow}  className='iconStyle' type='close' />
                    </Col>
                </Row>
            </div>
        )
    }
}
