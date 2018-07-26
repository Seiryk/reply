import React from 'react'
import { DatePicker } from 'antd';

import moment from 'moment';


const dateFormat = 'DD/MM/YYYY';

class dataPicker extends React.Component{
    datePickerHandler = (data, valName) => {
        const { datePickerHandler, defaultValue, name, id} = this.props;
        const obj = {
            ...defaultValue,
            [valName]: data
        }
        datePickerHandler(obj, name, id)
    }

    render () {
        const { defaultValue } = this.props;
        const datePick = (valName) => <DatePicker
            style={{width: 110}}
            format={dateFormat}
            placeholder='Значение'
            value={defaultValue && defaultValue[valName] ?  moment(defaultValue[valName], dateFormat) : undefined}
            onChange={(e, data) => this.datePickerHandler(data, valName)} />
        return(
            <React.Fragment>
                <span>С</span>
                {datePick('momentStart')}
                <span>по</span>
                {datePick('momentEnd')}
            </React.Fragment>
    )
    }

}

export default dataPicker