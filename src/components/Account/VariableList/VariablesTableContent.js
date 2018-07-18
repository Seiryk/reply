import React from 'react';
import PropTypes from 'prop-types'
import { Icon, Row, Col } from 'antd';

import Dropdown from '../../UI/dropdown';

const VariableTableContebt = (
    {
    el,
    fieldsName,
    projectsName,
    fieldName,
    projectName,
    deleteVariablesListItem, 
    dropdownHandleChange, 
    closeEditMode, 
    editVariableItem, 
    makeFieldEditable, 
    }
    ) => {
    return(
        <Row gutter={48}>
            <Col offset={3} span={6}>
                {
                    el.edit ? <Dropdown defaultValue={fieldName ? fieldName : el.fieldName.value} name='fieldName' dropdownHandleChange={dropdownHandleChange} options={fieldsName} width={200} />:
                    el.fieldName.text
                }
            </Col>
            <Col span={6} >
                {
                    el.edit ? <Dropdown defaultValue={projectName ? projectName : el.projectName.value} name='projectName' dropdownHandleChange={dropdownHandleChange} options={projectsName} width={200} />:
                    el.projectName.text
                }
            </Col>
            <Col span={6}>
                <Icon
                    className='iconStyle'
                    type={el.edit ? 'check' : "edit"}
                    onClick={(e) => el.edit ? editVariableItem(el) : makeFieldEditable(el)} />
                <Icon 
                    style={{marginLeft: 10}}
                    className='iconStyle'
                    type={el.edit ? 'close' : "delete"}
                    onClick={(e) => el.edit ? closeEditMode() : deleteVariablesListItem(el)} />
            </Col>
        </Row>
    )
}

export default VariableTableContebt

VariableTableContebt.propTypes = {
    el: PropTypes.object,
    projectName: PropTypes.string,
    fieldName: PropTypes.string,
    fieldsName: PropTypes.array,
    projectsName: PropTypes.array,
    deleteVariablesListItem: PropTypes.func,
    dropdownHandleChange: PropTypes.func,
    closeEditMode: PropTypes.func,
    editVariableItem: PropTypes.func,
    makeFieldEditable: PropTypes.func,
}