import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom'
import ConditionBlock from './conditionBlock'
import MailingName from './mailingName'
import BindsToCompanies from './bindToCompanies'
import Spiner from '../Layout/Spiner/spiner'
import notification from '../Layout/notification/notification'
import { deleteSelectedItem } from '../../utils/additionalFunctions'
import { getMailingItemConfigurationOptions, 
        removeCondition,
        removeBinding,
        addNewCondition,
        sendNewMailing,
        addNewBinding,
        changeApplServiceArr } from '../../actions/index'

import './styles/addMailing.less'

class AddMailind extends Component {
    state = {
        applServices: this.props.applServices,
        applServicesArrays: this.props.applServicesArrays,
        operators: this.props.operators,
        statuses: this.props.statuses,
        status: null,
        additionalConditions: this.props.additionalConditions,
        bindings: this.props.bindings,
        companies: this.props.companies,
        mailingName: null,
        emptyRowCondition: false,
        emptyRowBinding: false,
        newApplService: null,
        newOperator: null,
        newApplServiceValue: null,
        newCompany: null,
        newDelay: 30,
        editMailingName: !this.props.match.params.id,
    }


    addNewCondition = () => {
        const { newApplService, newOperator, newApplServiceValue } = this.state;
        if( newApplService && newOperator && newApplServiceValue ) {
            const newCondition = {
                applService: newApplService,
                applServiceValue: newApplServiceValue,
                operator: newOperator,
                id: String(Date.now()),
                unSaved: true
            }
            this.props.addNewCondition(newCondition);
                this.setState({
                    emptyRowCondition: true,
                    newApplService: null,
                    newOperator: null,
                    newApplServiceValue: null,
                });
        }   
        else notification('error', 'Поля пустые или не соответствуют формату ')
    }

    addNewBinding = () => {
        const { newDelay, newCompany } = this.state;
        if( newDelay && newCompany ) {
            const newBinding = {
                company: newCompany,
                delay: newDelay,
                id: String(Date.now()),
                unSaved: true
            }
            this.props.addNewBinding(newBinding);
            this.setState({newCompany: null, emptyRowBinding: true, newDelay: 30});
        }   
        else notification('error', 'Поля пустые или не соответствуют формату ')
    }

    addEmptyRow = (prop) => this.setState({[prop]: true})

    makeMailingNameEditable = () => {
        this.setState(prevState => {
            return{
                editMailingName: !prevState.editMailingName,
            }
        })
    }


    closeEmptyRowCondition = () => {
        this.setState({
            emptyRowCondition: false,
            newApplService: null,
            newOperator: null,
            newApplServiceValue: null,
        })
    }

    closeEmptyBindingRow = () => this.setState({ emptyRowBinding: false, newCompany: null, newDelay: 30 })

    removeCondition = (el) => {
        const message = 'условие'
        deleteSelectedItem(el, message, this, this.props.removeCondition);
    }

    removeBinding = (el) => {
        const message = 'привязку'
        this.state.bindings.length > 1 ?
        deleteSelectedItem(el, message, this, this.props.removeBinding) : 
            notification('error', 'У рассылки не может быть меньше одной привязки')
    }

    changeHandlerForNewVals = (val, name) => {
        const { applServicesArrays } = this.state
        if (!applServicesArrays[val] && name === 'newApplService') this.props.changeApplServiceArr(val);

        this.setState(prevState => {
            return {
                newApplServiceValue: name === 'newApplService' ? 
                    null :
                    prevState.newApplServiceValue,
                [name]: val,

            }
        })
        

    }
    

    changeHandlerForOldVals = (val, fieldName, id) => {
        const { applServicesArrays } = this.state;
        if (!applServicesArrays[val] && fieldName === 'applService') this.props.changeApplServiceArr(val)
        this.setState(prevState => {
            const { additionalConditions, bindings, status } = prevState
            return {
                additionalConditions: additionalConditions.map(el => {
                        if (el.id === id) {
                            return {
                                ...el,
                                applServiceValue: fieldName === 'applService' ? null : el.applServiceValue,
                                [fieldName]: val
                            }
                        }
                        else return el
                    }),
                    bindings: bindings.map(el => {
                        if (el.id === id) return { ...el, [fieldName]: val }
                        else return el
                    }),
                    status: fieldName === 'statuses' ? val : status
                }
        });
        
    }

    submit = () => {
        const { additionalConditions, status, bindings, mailingName } = this.state;
        const mailing =  { additionalConditions, status, bindings, mailingName };
        if (!mailingName)  notification('error', 'Название рассылки не должно быть пустым')
        else if (!status)  notification('error', 'Статус рассылки не должен быть пустым')
        else if (!bindings.length)  notification('error', 'Должна быть миннимум одна привязка')
        else this.props.sendNewMailing(mailing)
    }

    render() {
        const { loading, companies, bindings, mailingName, editMailingName,
            operators, status, statuses, applServices, additionalConditions=[], applServicesArrays
         } = this.state;
        return (
            <React.Fragment>
                { loading ? <Spiner /> : 
                <div>
                    <MailingName 
                        mailingName={mailingName}
                        editMailingName={editMailingName}
                        changeHandlerForNewVals={this.changeHandlerForNewVals}
                        makeMailingNameEditable={this.makeMailingNameEditable} />
                    <ConditionBlock
                        statuses={statuses}
                        status={status}
                        addEmptyRow={this.addEmptyRow}
                        applServices={applServices}
                        addNewCondition={this.addNewCondition}
                        removeCondition={this.removeCondition}
                        operators={operators}
                        closeEmptyRowCondition={this.closeEmptyRowCondition}
                        valuesForEmptyRowCondition={this.state}
                        changeHandlerForOldVals={this.changeHandlerForOldVals}
                        changeHandlerForNewVals={this.changeHandlerForNewVals}
                        applServicesArrays={applServicesArrays}
                        additionalConditions={additionalConditions}
                    />
                    <BindsToCompanies
                        addEmptyRow={this.addEmptyRow}
                        closeEmptyBindingRow={this.closeEmptyBindingRow}
                        bindings={bindings}
                        companies={companies}
                        addNewBinding={this.addNewBinding}
                        valuesForEmptyRowBindings={this.state}
                        removeBinding={this.removeBinding}
                        changeHandlerForOldVals={this.changeHandlerForOldVals}
                        changeHandlerForNewVals={this.changeHandlerForNewVals}
                    />
                    <div className='buttonWrap'>
                        <Button className='goBack' onClick={() => this.props.history.goBack()}>Назад</Button>
                        <Button className='submit' onClick={this.submit}>Сохранить</Button>
                    </div>
                </div> }
            </React.Fragment>
        )
    }

    componentDidMount () {
        const id = this.props.match.params.id;
        this.props.getMailingItemConfigurationOptions(id)
    }

    checkingState= (nextProps, prevState, name) => {
        let newArr = [];
        nextProps[name].forEach(newEl => {
            const elemFromLocalState = prevState[name].filter(oldEl => oldEl.id ===  newEl.id);
            elemFromLocalState.length ? newArr.push(elemFromLocalState[0]) : newArr.push(newEl)
        });
        return newArr;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
        const { mailingName, status } = prevState;
            return {
                applServices: nextProps.applServices,
                applServicesArrays: nextProps.applServicesArrays,
                operators: nextProps.operators,
                statuses: nextProps.statuses,
                status: !!status ? status : nextProps.status,
                additionalConditions: this.checkingState(nextProps, prevState, 'additionalConditions'),
                mailingName: !!mailingName ? mailingName : nextProps.mailingName,
                loading: nextProps.loading,
                bindings: this.checkingState(nextProps, prevState, 'bindings'),                
                companies: nextProps.companies,              
            }
        })
    }
}

const mapStateToProps  = (state) => ({
    statuses: state.addMailing.statuses,
    status: state.addMailing.status,
    mailingName: state.addMailing.mailingName,
    loading: state.addMailing.loading,
    bindsToCompanies: state.addMailing.bindsToCompanies,
    applServices: state.addMailing.applServices,
    applServicesArrays: state.addMailing.applServicesArrays,
    operators: state.addMailing.operators,
    additionalConditions: state.addMailing.additionalConditions,
    companies: state.addMailing.companies,
    bindings: state.addMailing.bindings,
})

export default withRouter(connect(mapStateToProps, {
    getMailingItemConfigurationOptions,
    changeApplServiceArr,
    addNewCondition,
    addNewBinding,
    removeCondition,
    sendNewMailing,
    removeBinding,
})(AddMailind))
