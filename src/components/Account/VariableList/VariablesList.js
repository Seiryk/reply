import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import {connect} from 'react-redux';

import Spiner from '../../Layout/Spiner/spiner';
import { deleteVariable, editVariable, createVariable, loadAllVariables } from '../../../actions/index'
import notification from '../../Layout/notification/notification'
import NewVariableEmptyRow from './NewVariableEmptyRow'
import VariablesTableContent from './VariablesTableContent'
import AddBtn from '../../UI/addButton'
import { deleteSelectedItem, makeFieldEditable, closeEditMode } from '../../../utils/additionalFunctions'


class VariablesList extends Component {
    state = {
        variablesList: [],
        newFieldName: null,
        newProjectName: null,
        fieldName: '',
        projectName: '',
        emptyVariableRow: false
    }
    renderTable = (variablesList) => {
        const { fieldsName, projectsName } = this.props;
        const { fieldName, projectName} = this.state;
        return variablesList.map((el, index) => {
            return(
                <div key={index} className='rowWraper'> 
                        <VariablesTableContent
                            el={el}
                            fieldsName={fieldsName}
                            projectsName={projectsName}
                            fieldName={fieldName}
                            projectName={projectName}
                            deleteVariablesListItem={this.deleteVariablesListItem}
                            dropdownHandleChange={this.dropdownHandleChange}
                            closeEditMode={this.closeEditMode}
                            editVariableItem={this.editVariableItem}
                            makeFieldEditable={this.makeFieldEditable}
                        />
                </div>
            )
        })
        
    }
    // удвление переменной
    deleteVariablesListItem = ({id}) => {
        const message = 'переменную';
        deleteSelectedItem(id, message, this, this.props.deleteVariable)
    }

    componentWillReceiveProps(nextProps){
        this.setState({ variablesList: nextProps.variablesList })
    }

    componentDidMount(){
        const { accountId, loadAllVariables } = this.props;
        loadAllVariables(accountId);
    }
// добавление переменной
    addNewVariable = () => {
        const { newFieldName, newProjectName } = this.state;
        if ( newFieldName && newProjectName ) {
            this.props.createVariable({projectName: newProjectName, fieldName: newFieldName})
            this.setState({ newFieldName: null, newProjectName: null, emptyVariableRow: true})
        }
        else notification('error', 'Поля не заполнены');
    }
//  делает поле редактируемым 
    makeFieldEditable = ({id}) => {
        makeFieldEditable(id, this, 'variablesList', 'projectName', 'fieldName');
    }
//  редактирование переменной
    editVariableItem = (el) => {
        const { fieldName, projectName  } = this.state;
        if (fieldName !== el.fieldName.value || projectName !== el.projectName.value) {
            this.props.editVariable({fieldName, projectName, id: el.id});
            this.setState({ fieldName: '', projectName: ''})
        } else this.closeEditMode()
    }
    closeEditMode = () => {
        closeEditMode(this, 'variablesList')
    }

    closeEmptyVariableRow = () => this.setState({ newFieldName: null, newProjectName: null, emptyVariableRow: false });

    showEmptyVariableRow = () => this.setState({emptyVariableRow: true});
// обработчик дропдауна для получения данных
    dropdownHandleChange = (name, {selectedVal: val}) => {
        this.setState({
            [name]: val
        })
    }

    render() {
        const { variablesList, newFieldName, newProjectName, emptyVariableRow } = this.state;
        const { title, loading, fieldsName, projectsName  } = this.props;
        return (
            <div>
               
                {
                    loading ? <Spiner /> : 
                    <React.Fragment>
                        <h1 className='title'>{title}</h1>
                        <div className='tableWraper'>
                        <Row gutter={48}>
                            <Col offset={3} span={6} >
                                <span className='tableFieldName' >Название поля в Reply</span>
                            </Col>
                            <Col span={6} >
                                <span className='tableFieldName' >Откуда брать значения ?</span>
                            </Col>
                        </Row>
                        {
                            this.renderTable(variablesList)
                        }
                        {
                            emptyVariableRow || !variablesList.length ? <NewVariableEmptyRow
                                fieldsName={fieldsName}
                                projectsName={projectsName}
                                newFieldName={newFieldName || undefined}
                                newProjectName={newProjectName || undefined}
                                dropdownHandleChange={this.dropdownHandleChange}
                                closeEmptyVariableRow={this.closeEmptyVariableRow}
                                addNewVariable={this.addNewVariable}/> :
                                    <AddBtn offset={19} addFunc={this.showEmptyVariableRow} />
                        }
                        </div>
                    </React.Fragment>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.variables.loading,
        fieldsName: state.variables.fieldsName,
        variablesList: state.variables.variablesList,
        projectsName: state.variables.projectsName,
    }
}

export default connect(mapStateToProps, {
    createVariable,
    deleteVariable,
    editVariable,
    loadAllVariables
})(VariablesList);

VariablesList.propTypes = {
    loading: PropTypes.bool,
    fieldsName: PropTypes.array,
    projectsName: PropTypes.array,
    createVariable: PropTypes.func,
    deleteVariable: PropTypes.func,
    editVariable: PropTypes.func,
    variablesList: PropTypes.array,
    loadAllVariables: PropTypes.func,
}
