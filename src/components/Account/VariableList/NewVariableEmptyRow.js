import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';

import Dropdown from '../../UI/dropdown';
import IconsCheckClose from '../../UI/IconsCheckClose';

const NewVariableEmptyRow = ({fieldsName, newProjectName, newFieldName, projectsName, dropdownHandleChange, closeEmptyVariableRow, addNewVariable}) => {
    return(
        <Row style={{marginTop: 50}} gutter={48}>
            <Col offset={3} span={6} >
                <Dropdown defaultValue={newFieldName} name='newFieldName' dropdownHandleChange={dropdownHandleChange} options={fieldsName} width={200} />
            </Col>
            <Col span={6} >
                <Dropdown defaultValue={newProjectName} name='newProjectName' dropdownHandleChange={dropdownHandleChange} options={projectsName} width={200} />
            </Col>
            <IconsCheckClose addNew={addNewVariable} closeEmptyRow={closeEmptyVariableRow} span={6} />
        </Row>
        )
}

export default NewVariableEmptyRow;

NewVariableEmptyRow.propTypes = {
    newProjectName: PropTypes.string,
    newFieldName: PropTypes.string,
    fieldsName: PropTypes.array,
    projectsName: PropTypes.array,
    dropdownHandleChange: PropTypes.func,
    addNewVariable: PropTypes.func,
    closeEmptyVariableRow: PropTypes.func,
}