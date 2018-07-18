import React from 'react'
import { Row, Col, Input } from 'antd'
import Dropdown from '../UI/dropdown'
import IconsCheckClose from '../UI/IconsCheckClose'


const EmptyRowCondition = (props) => {
        const { 
            values,
            operators,
            applServices,
            applServicesArrays,
            closeEmptyRowCondition,
            addNewCondition,
            changeHandlerForNewVals
        } = props;
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
                    <IconsCheckClose addNew={addNewCondition} closeEmptyRow={closeEmptyRowCondition} span={4} />
                </Row>
            </div>
        )
}

export default EmptyRowCondition;