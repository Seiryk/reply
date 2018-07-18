import React from 'react';
import { Icon, Col } from 'antd';

const NewAccountEmptyRow = ({ addNew, closeEmptyRow, span }) => {
    return(
        <Col span={span}>
            <Icon
                style={{marginLeft: 3}}
                className='iconStyle'  
                type="check"
                onClick={addNew} />
            <Icon
                style={{marginLeft: 10}}
                className='iconStyle'  
                type="close"
                onClick={closeEmptyRow} />
        </Col>
        )
}

export default NewAccountEmptyRow