import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon, Input, Checkbox } from 'antd'
import Dropdown from '../UI/dropdown'
import DataPicker from '../UI/dataPicker'
import MultipleDropdown from '../UI/multipleDropdown'
import AddButton from '../UI/addButton'
import EmptyRowConditions from './emptyRowConditions'

const errorStyle = {borderColor: 'red', boxShadow: 'none'};

class ConditionBlock extends React.Component {
    renderApplService = (el) => {
        // console.log(el);
        const { changeHandlerForOldVals, datePickerHandler, deleteInnerCatalog, showInnerCatalog, applServicesArrays } = this.props;
        const name = 'applServiceValue';
        switch (el.type) {
            case 'input':
                return <Input
                    name={name}
                    style={{width: '244px', ...(el.applServiceValue ? {} : errorStyle) }}
                    placeholder='Введите значение'
                    onChange={(e) => changeHandlerForOldVals(e.target.name, {selectedVal: e.target.value, type: el.type}, el.id)} 
                    value={el.applServiceValue} />
            case 'multiple':
                return  <React.Fragment>
                            <MultipleDropdown
                                defaultValue={el.applServiceValue}
                                name={name}
                                id={el.id}
                                options={applServicesArrays[el.catalogName]}
                                dropdownHandleChange={changeHandlerForOldVals} 
                                showInnerCatalog={showInnerCatalog} 
                                deleteInnerCatalog={deleteInnerCatalog} 
                                width={244} />
                                {this.renderInnerDropdowns(el.additionalDropdowns, el.id)}
                    </React.Fragment>
            case 'dataPicker':
                return  <DataPicker
                    defaultValue={el.applServiceValue || undefined}
                    name={name}
                    id={el.id}
                    width={100}
                    datePickerHandler={datePickerHandler} />
            case 'checkbox':
                return  <Checkbox
                    className='checkboxMailing'
                    checked={el.applServiceValue || undefined}
                    name={name}
                    onChange={(e) => changeHandlerForOldVals(e.target.name, {selectedVal: e.target.checked, type: el.type}, el.id)} />
            default:
                return <Dropdown
                    defaultValue={el.applServiceValue || undefined}
                    name={name}
                    id={el.id}
                    options={applServicesArrays[el.catalogName]}
                    dropdownHandleChange={changeHandlerForOldVals} 
                    width={244} />
        }
    }
    // отображение внутреннего селекта 
    renderInnerDropdowns = (innerDropdownList, id) => {
        if (!innerDropdownList || !innerDropdownList.length) return null;
        const {applServicesArrays, sabSelectHandler} = this.props;
        return innerDropdownList.map(el => {
                            return (
                                <Row className='innerSelect' key={el.value}>
                                    <Col className='innerSelectName' span={24}>{`${el.catalog.catalogText} :`}</Col>
                                    <Col span={24}>
                                        <MultipleDropdown
                                            defaultValue={el.values}
                                            id={id}
                                            name={el.value}
                                            options={applServicesArrays[el.catalog.catalogName]}
                                            dropdownHandleChange={sabSelectHandler}
                                            width={244} />
                                    </Col>
                                </Row>  

                            )
                        })
    }

    render () {
        const { 
            operators,
            datePickerHandler,
            additionalConditions, 
            applServices,
            applServicesArrays,
            statuses,
            status,
            valuesForEmptyRowCondition,
            sabSelectHandlerForNewCondition,
            deleteInnerCatalogForNewCondition,
            showInnerCatalogForNewCondition,
            addEmptyRow,
            addNewCondition,
            closeEmptyRowCondition,
            removeCondition,
            changeHandlerForNewVals,
            changeHandlerForOldVals
        } = this.props;
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
                                <Col span={5}><Dropdown
                                     name='operator'
                                     id={el.id}
                                     defaultValue={el.operator} 
                                     options={operators} 
                                     dropdownHandleChange={changeHandlerForOldVals} 
                                     width={150} /></Col>
                                <Col span={8}>
                                    {this.renderApplService(el)}
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
                        datePickerHandler={datePickerHandler}
                        closeEmptyRowCondition={closeEmptyRowCondition}
                        operators={operators}
                        applServices={applServices}
                        addNewCondition={addNewCondition}
                        applServicesArrays={applServicesArrays}
                        changeHandlerForNewVals={changeHandlerForNewVals}
                        showInnerCatalogForNewCondition={showInnerCatalogForNewCondition}
                        sabSelectHandlerForNewCondition={sabSelectHandlerForNewCondition}
                        deleteInnerCatalogForNewCondition={deleteInnerCatalogForNewCondition}
                  /> : 
                  <AddButton addFunc={() =>addEmptyRow('emptyRowCondition')} offset={22} />
                }
            </div>
        )
    }
}

export default ConditionBlock;

ConditionBlock.propTypes = {
    operators: PropTypes.array,
    additionalConditions: PropTypes.array,
    applServices: PropTypes.array,
    applServicesArrays: PropTypes.object,
    statuses: PropTypes.array,
    status: PropTypes.string,
    valuesForEmptyRowCondition: PropTypes.object,
    addEmptyRow: PropTypes.func,
    addNewCondition: PropTypes.func,
    closeEmptyRowCondition: PropTypes.func,
    removeCondition: PropTypes.func,
    changeHandlerForNewVals: PropTypes.func,
    changeHandlerForOldVals: PropTypes.func,
}
