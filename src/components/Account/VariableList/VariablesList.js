import React, { Component } from 'react'

import { Row, Col } from 'antd';
import {connect} from 'react-redux';

import Spiner from '../../Layout/Spiner/spiner';
import { deleteVariable, editVariable, createVariable, loadAllVariables } from '../../../actions/index'
import { getVariablesState } from '../../../selectors/index'
import notification from '../../Layout/notification/notification'
import AddField from './AddField'
import VariablesTableContent from './VariablesTableContent'
import AddBtn from '../../UI/addButton'
import { deleteSelectedItem, makeFieldEditable, closeEditMode } from '../../../utils/additionalFunctions'


class VariablesList extends Component {
    state = {
        variablesList: [],
        newFieldName: '',
        newProjectName: '',
        fieldName: '',
        projectName: ''
    }

    renderTable = (variablesList) => {
        const { fieldsName, projectsName } = this.props.variablesState;
        const { newFieldName, newProjectName, fieldName, projectName} = this.state;
        return variablesList.map((el, index) => {
            return(
                <div key={index} className='rowWraper'>
                    {el.new ? 
                        <AddField
                            fieldsName={fieldsName}
                            projectsName={projectsName}
                            newFieldName={newFieldName}
                            newProjectName={newProjectName}
                            dropdownHandleChange={this.dropdownHandleChange}
                            closeAddField={this.closeAddField}
                            addNewVariable={this.addNewVariable}
                        /> :
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
                    }
                </div>
            )
        })
        
    }
    deleteVariablesListItem = ({id}) => {
        const message = 'переменную';
        deleteSelectedItem(id, message, this, this.props.deleteVariable)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            variablesList: nextProps.variablesState.variablesList,
            newFieldName: '',
            newProjectName: ''
        })
    }

    componentDidMount(){
        const { id, loadAllVariables } = this.props;
        loadAllVariables(id);
    }

    addNewVariable = () => {
        const { newFieldName, newProjectName } = this.state;
        if ( newFieldName.length && newProjectName.length ) {
            this.props.createVariable({projectName: newProjectName, fieldName: newFieldName})
        }
        else notification('error', 'Поля не заполнены');
    }

    makeFieldEditable = ({id}) => {
        makeFieldEditable(id, this, 'variablesList', 'projectName', 'fieldName');
    }

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

    closeAddField = () => {
        this.setState(prevState => {
            return {
                variablesList: prevState.variablesList.filter(el => el.new !== true),
                newFieldName: '',
                newProjectName: ''
            }
        })
    }

    addField = () => {
        const isNew = this.state.variablesList.find(el => el.new === true);
        if (!isNew) {
            this.setState(prevState => {
                return {
                    variablesList: [...prevState.variablesList,{
                        new: true
                    }]
                }
            })
        }
    }

    dropdownHandleChange = (val, name) => {
        this.setState({
            [name]: val
        })
    }

    render() {
        const { variablesList } = this.state;
        const { title, variablesState: { loading }  } = this.props;
        return (
            <div>
               
                {
                    loading ? <Spiner />: <React.Fragment>
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
                                            <AddBtn offset={19} addFunc={this.addField} />
                                            </div>
                                        </React.Fragment>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        variablesState: getVariablesState(state),
    }
}

export default connect(mapStateToProps, {
    createVariable,
    deleteVariable,
    editVariable,
    loadAllVariables
})(VariablesList);