import React, { Component } from 'react'
import { Select } from 'antd';

const Option = Select.Option;


export default class Dropdown extends Component {
    handleChange = (selectedVal, e) => {
        const {id, name} = this.props;
        const {type, catalogname} = e.props;
        this.props.dropdownHandleChange(name, {selectedVal, catalogName: catalogname, type}, id);
    }
    render() {
        const { options = [], width, defaultValue, disabled = false } = this.props;
        return (
            <div>
                <Select
                 disabled={disabled}
                //  className={!defaultValue && name === 'applServiceValue' ? 'customDropDown': '' }
                 value={defaultValue} 
                 placeholder= 'выберите значение'
                 onChange={this.handleChange} 
                 style={{ width }}>
                    {
                        options.map( ({value, text, type, catalogName}) => <Option catalogname={catalogName} key={value} type={type} value={value} >{text}</Option> )
                    }
                </Select>
            </div>
        )
    }
}
