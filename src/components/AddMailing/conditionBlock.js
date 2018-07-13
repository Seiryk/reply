import React from 'react'
import { Row, Col, Icon, Input } from 'antd'
import Dropdown from '../UI/dropdown'
import AddButton from '../UI/addButton'
import EmptyRowConditions from './emptyRowConditions'

const ConditionBlock = (props) => {
        const { 
            operators,
            additionalConditions, 
            applServices,
            applServicesArrays,
            statuses,
            status,
            valuesForEmptyRowCondition,
            addEmptyRow,
            addNewCondition,
            closeEmptyRowCondition,
            removeCondition,
            changeHandlerForNewVals,
            changeHandlerForOldVals
        } = props;
        return (
            <div className='conditionBlockWrapper'>
                <h1>Условия добавления контакта в рассылку</h1>
                <Row className='additionConditionTitle' >
                    <Col offset={2} span={22}>
                        <p>Статус задачи-заявки в ПланФикс:</p>
                        <Dropdown 
                            dropdownHandleChange={changeHandlerForOldVals} 
                            name='statuses' 
                            defaultValue={status}
                            options={statuses} 
                            width={200} />
                    </Col>
                </Row>
                <Row className='additionConditionTitle'>
                    <Col offset={2} span={22}>
                        <p>Дополнительные условия:</p>
                    </Col>
                </Row>
                {
                    additionalConditions.map(el => {
                        return (
                        <div key={el.id} className='conditionRowWrapper'>
                            <Row>
                                <Col span={2}></Col>
                                <Col span={6}><Dropdown
                                     name='applService'
                                     id={el.id}
                                     defaultValue={el.applService} 
                                     options={applServices} 
                                     dropdownHandleChange={changeHandlerForOldVals} 
                                     width={200} /></Col>
                                <Col span={6}><Dropdown
                                     name='operator'
                                     id={el.id}
                                     defaultValue={el.operator} 
                                     options={operators} 
                                     dropdownHandleChange={changeHandlerForOldVals} 
                                     width={200} /></Col>
                                <Col span={6}>
                                    {applServicesArrays[el.applService].length ?
                                    <Dropdown
                                    {...(!!el.applServiceValue ? {defaultValue:el.applServiceValue} : {})}
                                     name='applServiceValue'
                                     id={el.id}
                                     options={applServicesArrays[el.applService]}
                                     dropdownHandleChange={changeHandlerForOldVals} 
                                     width={200} /> :
                                         <Input
                                            name='applServiceValue'
                                            placeholder='Введите значение'
                                            onChange={(e) => changeHandlerForOldVals(e.target.value, e.target.name, el.id)} 
                                            value={el.applServiceValue} 
                                            style={{width: '200px'}}/>
                                     }
                                </Col>
                                <Col span={2}><Icon onClick={() => removeCondition(el)} className='iconStyle' type='delete' /></Col>
                            </Row>
                        </div>)
                    }) 
                }
                {
                    valuesForEmptyRowCondition.emptyRowCondition || !additionalConditions.length ? 
                    <EmptyRowConditions    
                        values={valuesForEmptyRowCondition}
                        closeEmptyRowCondition={closeEmptyRowCondition}
                        operators={operators}
                        applServices={applServices}
                        addNewCondition={addNewCondition}
                        applServicesArrays={applServicesArrays}
                        changeHandlerForNewVals={changeHandlerForNewVals}
                  /> : null
                }
                <AddButton addFunc={() =>addEmptyRow('emptyRowCondition')} offset={20} />
            </div>
        )
}

export default ConditionBlock
