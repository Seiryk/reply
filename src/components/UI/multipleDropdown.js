import React, { Component } from 'react'
import { Select } from 'antd';

const Option = Select.Option;


export default class Dropdown extends Component {
    handleChange = (selectedVal, e) => {
        const {id, name, dropdownHandleChange} = this.props;
        dropdownHandleChange(name, {selectedVal}, id);
    }
    handlerOnSelect = (value, option) => {
        const {id, showInnerCatalog} = this.props;
        const { catalog: {catalogName, catalogText} } = option.props;
        if (catalogName) showInnerCatalog({catalogName, catalogText}, value, id)

    }
    handlerOnDeselect = (value, option) => {
        const {id, deleteInnerCatalog} = this.props;
        const { catalog: {catalogName} } = option.props;
        if (catalogName) deleteInnerCatalog(value, id)

    }
    render() {
        const { options = [], width, defaultValue=[], disabled = false, } = this.props;
        const isDefaultValue = defaultValue || [];
        return (
            <div>
                <Select
                    mode='multiple'    
                    disabled={disabled}
                    //  className={isDefaultValue.length ? '': 'customDropDown' }
                    value={isDefaultValue}
                    onSelect={this.handlerOnSelect}
                    onDeselect={this.handlerOnDeselect}
                    onChange={this.handleChange}
                    placeholder= 'выберите значение'
                    style={{ width }}>
                        {
                            options.map( ({value, text, catalogName, catalogText}) => <Option catalog={{catalogName, catalogText}} key={value} value={value} >{text}</Option> )
                        }
                    </Select>
            </div>
        )
    }
}
