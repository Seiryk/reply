import React, { Component } from 'react'
import { Select } from 'antd';

const Option = Select.Option;



export default class Dropdown extends Component {
    handleChange = (selectedVal) => {
        this.props.dropdownHandleChange(selectedVal, this.props.name, this.props.id)
    }
    render() {
        const { options = [], width, defaultValue } = this.props;
        return (
            <div>
                <Select value={defaultValue ? defaultValue : 'Выберите значение'} onChange={this.handleChange} style={{ width }}>
                    {
                        options.map( ({value, text}) => <Option key={value} value={value} >{text}</Option> )
                    }
                </Select>
            </div>
        )
    }
}
