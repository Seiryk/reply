import React, { Component } from 'react'
import { Row, Col, Icon, Input } from 'antd'
import Dropdown from '../UI/dropdown'


export default class emptyRow extends Component {
    render() {
        const { 
            values,
            operators,
            applServices,
            applServicesArrays,
            closeEmptyRowCondition,
            addNewCondition,
            changeHandlerForNewVals
        } = this.props;
        return (
            <div style={{marginTop: 50}} className='conditionRowWrapper'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={6}><Dropdown
                         name='newApplService'
                         defaultValue={values.newApplService} 
                         options={applServices} 
                         dropdownHandleChange={changeHandlerForNewVals} 
                         width={200} /></Col>
                    <Col span={6}><Dropdown
                         name='newOperator'
                         defaultValue={values.newOperator} 
                         options={operators} 
                         dropdownHandleChange={changeHandlerForNewVals} 
                         width={200} /></Col>
                    <Col span={6}>
                        {applServicesArrays[values.newApplService] && applServicesArrays[values.newApplService].length ?
                        <Dropdown
                        disabled={values.newApplService? false : true}
                        {...(values.newApplServiceValue ? {defaultValue:values.newApplServiceValue} : {})}
                         name='newApplServiceValue'
                         options={applServicesArrays[values.newApplService]}
                         dropdownHandleChange={changeHandlerForNewVals} 
                         width={200} /> : <Input
                            name='newApplServiceValue'
                            placeholder='Введите значение'
                            disabled={values.newApplService? false : true} 
                            onChange={e => changeHandlerForNewVals(e.target.value, e.target.name)} 
                            value={values.newApplServiceValue} 
                            style={{width: '200px'}}/>
                         }
                    </Col>
                    <Col span={4}>
                        <Icon style={{marginLeft: 3}} onClick={addNewCondition}  className='iconStyle' type='check' />
                        <Icon style={{marginLeft: 10}} onClick={closeEmptyRowCondition} className='iconStyle' type='close' />
                    </Col>
                </Row>
            </div>
        )
    }
}
