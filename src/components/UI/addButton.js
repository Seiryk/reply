import React from 'react';
import { Row, Col, Icon } from 'antd';

const addButton = ({offset, addFunc}) => {
    return(
        <Row type="flex" align="middle" style={{height: 100}}>
            <Col offset={offset} span={2}>
                <Icon 
                    className='iconStyle'  
                    type="plus-circle-o"
                    onClick={addFunc} />
            </Col>
        </Row>
    )
}

export default addButton