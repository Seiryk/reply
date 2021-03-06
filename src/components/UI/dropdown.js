import React, { Component } from 'react'
import { Select } from 'antd';

const Option = Select.Option;


export default class Dropdown extends Component {
    handleChange = (selectedVal, e) => {
        const {id, name} = this.props;
        const {type, catalogname} = e.props;
        let obj =  {selectedVal};
        if (catalogname) obj.catalogName = catalogname
        if (type) obj.type = type
        this.props.dropdownHandleChange(name, obj, id);
    }
    render() {
        const { options = [], width, name, defaultValue, disabled = false } = this.props;
        return (
            <div>
                <Select
                 disabled={disabled}
                 className={!defaultValue && name === 'applServiceValue' ? 'customDropDown': '' }
                 value={defaultValue} 
                 placeholder= 'Выберите значение'
                 onChange={this.handleChange} 
                 style={{ width }}>
                    {
                        options.map( ({value, text, type, catalogName}) => <Option
                        catalogname={catalogName}
                        key={value} 
                        type={type} 
                        value={value} >{text}</Option> )
                    }
                </Select>
            </div>
        )
    }
}
