import React from 'react';
import { Icon } from 'antd';

import './spiner.less'

const Spiner = () => (
    <div className='spiner'>
        <Icon className='spinerIcon' type='loading' />
    </div>
)

export default Spiner