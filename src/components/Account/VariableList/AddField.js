import React from 'react';
import { Icon, Row, Col } from 'antd';

import Dropdown from '../../UI/dropdown';

const AddField = ({fieldsName, newProjectName, newFieldName, projectsName, dropdownHandleChange, closeAddField, addNewVariable}) => {
    return(
        <Row gutter={48}>
            <Col offset={3} span={6} >
                <Dropdown defaultValue={newFieldName} name='newFieldName' dropdownHandleChange={dropdownHandleChange} options={fieldsName} width={200} />
            </Col>
            <Col span={6} >
                <Dropdown defaultValue={newProjectName} name='newProjectName' dropdownHandleChange={dropdownHandleChange} options={projectsName} width={200} />
            </Col>
            <Col span={6}>
                <Icon
                    className='iconStyle'
                    type="check"
                    onClick={addNewVariable} />
                <Icon 
                    style={{marginLeft: 10}}
                    className='iconStyle'
                    type="close"
                    onClick={closeAddField} />
            </Col>
        </Row>
        )
}

export default AddField