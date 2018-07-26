import React from 'react'
import { Row, Col, Input, Checkbox } from 'antd'
import Dropdown from '../UI/dropdown'
import DataPicker from '../UI/dataPicker'
import MultipleDropdown from '../UI/multipleDropdown'
import IconsCheckClose from '../UI/IconsCheckClose'

class EmptyRowCondition extends React.Component {
    renderApplService = () => {
        const { values, 
            applServicesArrays, 
            showInnerCatalogForNewCondition, 
            deleteInnerCatalogForNewCondition, 
            datePickerHandler, 
            changeHandlerForNewVals } = this.props;
            // console.log(values);
        const name = 'newApplServiceValue';
        switch (values.type) {
            case 'input':
                return <Input
                    name={name}
                    placeholder='Введите значение'
                    disabled={values.newApplService? false : true} 
                    onChange={e => changeHandlerForNewVals(e.target.value, e.target.name)} 
                    value={values.newApplServiceValue} 
                    style={{width: '244px'}}/>
            case 'multiple':
                return <React.Fragment> 
                            <MultipleDropdown
                                disabled={values.newApplService ? false : true}
                                defaultValue={values.newApplServiceValue}
                                name={name}
                                options={applServicesArrays[values.catalogName]}
                                dropdownHandleChange={changeHandlerForNewVals} 
                                deleteInnerCatalog={deleteInnerCatalogForNewCondition} 
                                showInnerCatalog={showInnerCatalogForNewCondition} 
                                width={244} />
                            {this.renderInnerDropdownsForNewCondition(values.additionalDropdowns)}
                        </React.Fragment>
            case 'dataPicker':
                return  <DataPicker
                    defaultValue={values.newApplServiceValue || undefined}
                    name={name}
                    width={100}
                    datePickerHandler={datePickerHandler} />
            case 'checkbox':
                return  <Checkbox
                    className='checkboxMailing'
                    checked={values.newApplServiceValue || undefined}
                    name={name}
                    onChange={e => changeHandlerForNewVals(e.target.checked, e.target.name)} />
            default:
                return <Dropdown
                    disabled={values.newApplService ? false : true}
                    defaultValue={values.newApplServiceValue || undefined}
                    name={name}
                    type={values.type}
                    options={applServicesArrays[values.catalogName]}
                    dropdownHandleChange={changeHandlerForNewVals} 
                    width={244} />
        }
    }
    // отображение внутреннего селекта 
    renderInnerDropdownsForNewCondition = (innerDropdownList) => {
        if (!innerDropdownList || !innerDropdownList.length) return null;
        const {applServicesArrays, sabSelectHandlerForNewCondition} = this.props;
        return innerDropdownList.map(el => {
                            return (
                                <Row className='innerSelect' key={el.value}>
                                    <Col className='innerSelectName' span={24}>{`${el.catalog.catalogText} :`}</Col>
                                    <Col span={24}>
                                        <MultipleDropdown
                                            defaultValue={el.values}
                                            name={el.value}
                                            options={applServicesArrays[el.catalog.catalogName]}
                                            dropdownHandleChange={sabSelectHandlerForNewCondition}
                                            width={244} />
                                    </Col>
                                </Row>  
                            )
                        })
    }
    render () {
        const { 
            values,
            operators,
            applServices,
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
                         defaultValue={values.newApplService || undefined} 
                         options={applServices} 
                         dropdownHandleChange={changeHandlerForNewVals} 
                         width={200} /></Col>
                    <Col span={5}><Dropdown
                         name='newOperator'
                         defaultValue={values.newOperator || undefined} 
                         options={operators} 
                         dropdownHandleChange={changeHandlerForNewVals} 
                         width={150} /></Col>
                    <Col span={8}>
                        {this.renderApplService()}
                    </Col>
                    <IconsCheckClose addNew={addNewCondition} closeEmptyRow={closeEmptyRowCondition} span={3} />
                </Row>
            </div>
        )
    }
}

export default EmptyRowCondition;