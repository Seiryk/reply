import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom'
import {error, dateSizeError, emptyError, quantityBindError, emptyCanditionError, mailingNameError, statuseError} from '../../utils/constants'
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

import moment from 'moment';

import './styles/addMailing.less'

class AddMailind extends Component {
    state = {
        applServices: this.props.applServices,
        applServicesArrays: this.props.applServicesArrays,
        operators: this.props.operators,
        statuses: this.props.statuses,
        status: '',
        additionalConditions: this.props.additionalConditions,
        bindings: this.props.bindings,
        companies: this.props.companies,
        mailingName: '',
        emptyRowCondition: false,
        emptyRowBinding: false,
        newApplService: null,
        type: null,
        additionalDropdowns: [],
        newOperator: null,
        newApplServiceValue: null,
        newCompany: null,
        newDelay: 30,
        editMailingName: !this.props.match.params.id,
    }
//валидация датапикера что бы минимальное значение не было больше максимального
    datePickerValidation = (fieldName, {momentStart, momentEnd}, el) => {
        if(momentStart && momentEnd) {
            const valid = moment(momentStart, ['DD/MM/YYYY']).isBefore(moment(momentEnd, ['DD/MM/YYYY']));
            if (!valid) { 
                notification(error, dateSizeError)
                return { ...el,[fieldName]: {}}
            }
        }
        if (el) return { ...el,[fieldName]: {momentStart, momentEnd}}
        else return {momentStart, momentEnd}
    }
// обработчик датапикера (записывает выбранное значение в условие)
    datePickerHandler = (data, fieldName, id) => {
        if (id) {
            this.setState(prevState => ({
                additionalConditions: prevState.additionalConditions.map(el => {
                    if (el.id === id) return this.datePickerValidation(fieldName, data, el)
                    else return el
                }),
            }))
        } else this.setState({newApplServiceValue: this.datePickerValidation(fieldName, data)})
    }
// так как выбранное значение может иметь разные типы то проверяем на валидность 
    isNewApplServiceValueIsValid = (value, type) => {
        let valid;
        switch (true) {
            case Array.isArray(value):
                valid = !!value.length; break;
            case typeof value === 'object' && value !== null:
                valid = Object.keys(value).length === 2 && value.momentStart && value.momentEnd ? true : false ; break
            case typeof value === 'string':
                valid = value.trim(); break
            default:
                valid = type === 'checkbox' ? true : value ;
        }
        return !!valid;
    }

    //  добавление нового условия
    addNewCondition = () => {
        const { newApplService, newOperator, type, newApplServiceValue, additionalDropdowns } = this.state;
        if( newApplService && newOperator && this.isNewApplServiceValueIsValid(newApplServiceValue, type) ) {
            const newCondition = {
                applService: newApplService,
                applServiceValue: newApplServiceValue,
                operator: newOperator,
                type,
                additionalDropdowns,
                id: String(Date.now()),
                unSaved: true
            }
            this.props.addNewCondition(newCondition);
                this.setState({
                    emptyRowCondition: true,
                    newApplService: null,
                    newOperator: null,
                    additionalDropdowns: [],
                    type: null,
                    newApplServiceValue: null,
                });
        }   
        else notification(error, emptyError)
    }


    // добавление новой привязки
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
        else notification(error, emptyError)
    }
    // показывает пустую строку для добавления и привязок и условий
    addEmptyRow = (prop) => this.setState({[prop]: true})

    // делает поле имени возможным редактировать
    makeMailingNameEditable = () => {
        this.setState(prevState => {
            return{
                editMailingName: !prevState.editMailingName,
            }
        })
    }

// скрывает строку которая для добавления условия
    closeEmptyRowCondition = () => {
        this.setState({
            emptyRowCondition: false,
            newApplService: null,
            newOperator: null,
            type: null,
            additionalDropdowns: [],
            newApplServiceValue: null,
        })
    }
// скрывает строку которая для добавления привязки
    closeEmptyBindingRow = () => this.setState({ emptyRowBinding: false, newCompany: null, newDelay: 30 })
// удаления условия
    removeCondition = (el) => {
        const message = 'условие'
        deleteSelectedItem(el, message, this, this.props.removeCondition);
    }
// удаление привязки
    removeBinding = (el) => {
        const message = 'привязку'
        this.state.bindings.length > 1 ?
        deleteSelectedItem(el, message, this, this.props.removeBinding) : 
            notification(error, quantityBindError)
    }

// отображает select который внутри другого select (для старых значений) в форме добавления и редактирования доп. условий
    showInnerCatalog = ({catalogName, catalogText}, value, id) => {
        const { applServicesArrays } = this.state;
        if ( !applServicesArrays[catalogName] ) this.props.changeApplServiceArr(catalogName)
        this.setState(prevState => {
            return {
                additionalConditions: prevState.additionalConditions.map(el => {
                        if (el.id === id) {
                                const arr = el.additionalDropdowns ? el.additionalDropdowns:[]
                                let  additionalDropdowns = [...arr];
                                additionalDropdowns.push({value, catalog: {catalogName, catalogText}, values: []});
                                additionalDropdowns = [...additionalDropdowns]
                            return {...el, additionalDropdowns}
                        }
                        else return el
                    }),
                }
        });
    }
// отображает select который внутри другого select (для новых значений) в форме добавления и редактирования доп. условий
    showInnerCatalogForNewCondition = ({catalogName, catalogText}, value) => {
        const { applServicesArrays } = this.state;
        if ( !applServicesArrays[catalogName] ) this.props.changeApplServiceArr(catalogName)
        this.setState(prevState => {
            return {
                additionalDropdowns: [...prevState.additionalDropdowns, {value, catalog: {catalogName, catalogText}, values: []}]
                }
        });
    }
// удаляет select который внутри другого select (для старых значений) в форме добавления и редактирования доп. условий
    deleteInnerCatalog = (value, id) => {
        this.setState(prevState => {
            return {
                additionalConditions: prevState.additionalConditions.map(el => {
                        if (el.id === id) {
                            return {
                                ...el,
                                additionalDropdowns: el.additionalDropdowns.filter(el => el.value !== value)
                            }
                        }
                        else return el
                    }),
                }
        });
    }
// удаляет select который внутри другого select (для новых значений) в форме добавления и редактирования доп. условий
    deleteInnerCatalogForNewCondition = (value) => {
        this.setState(prevState => {
            return {
                additionalDropdowns: prevState.additionalDropdowns.filter(el => el.value !== value)
                }
        });
    }
// обробатывается выбранное значение select который внутри другого select (для старых значений) в форме добавления и редактирования доп. условий
    sabSelectHandler = (name, {selectedVal: values}, id) => {
        this.setState(prevState => {
            return {
                additionalConditions: prevState.additionalConditions.map(el => {
                        if (el.id === id) {
                            return {
                                ...el,
                                additionalDropdowns: el.additionalDropdowns.map(el => {
                                    if (el.value === name) return {...el, values}
                                    else return el
                                })
                            }
                        }
                        else return el
                    }),
                }
        });
    }
// обробатывается выбранное значение select который внутри другого select (для новых значений) в форме добавления и редактирования доп. условий
    sabSelectHandlerForNewCondition = (name, {selectedVal: values}) => {
        this.setState(prevState => {
            return {
                additionalDropdowns: prevState.additionalDropdowns.map(el => {
                    if (el.value === name) return {...el, values}
                    else return el
                    })
                }
        });
    }

    // обробатывает select где добавляются новые элементы в форме добавления и редактирования доп. условий
    changeHandlerForNewVals = (fieldName, {type, catalogName, selectedVal}) => {
        // console.log(catalogName)
            const { applServicesArrays } = this.state
            if (!applServicesArrays[selectedVal] && fieldName === 'newApplService' && type === 'select') this.props.changeApplServiceArr(selectedVal);

            this.setState(prevState => {
                return {
                    newApplServiceValue: fieldName !== 'newApplService' ? prevState.newApplServiceValue : type === 'checkbox' ? false : null,
                    type: fieldName === 'newApplService' ? type : prevState.type,
                    [fieldName]: selectedVal,
                    catalogName: catalogName || prevState.catalogName,
                }
            })
        }
    
    // обробатывает select где изменяются старые элементы в форме добавления и редактирования доп. условий
    changeHandlerForOldVals = (fieldName, {selectedVal, catalogName, type}, id) => {
        const { applServicesArrays } = this.state;
        if (!applServicesArrays[selectedVal] && fieldName === 'applService' && type === 'select')
            this.props.changeApplServiceArr(catalogName)

        this.setState(prevState => {
            const { additionalConditions, bindings, status } = prevState
            return {
                additionalConditions: additionalConditions.map(el => {
                        if (el.id === id) {
                            const editedEl = {
                                ...el,
                                applServiceValue: fieldName !== 'applService' ? el.applServiceValue : type === 'checkbox' ? false : null,
                                [fieldName]: selectedVal,
                                catalogName: catalogName || el.catalogName,
                                type: fieldName === 'applService' ? type : el.type,
                            }
                            return editedEl
                        }
                        else return el
                    }),
                    bindings: bindings.map(el => {
                        if (el.id === id) return { ...el, [fieldName]: selectedVal }
                        else return el
                    }),
                    status: fieldName === 'statuses' ? selectedVal : status
                }
        });
    }

    // проверяет заполнено ли поле applServiceValue (так как оно в процессе редактирования может стать путым)
    chekValidity = (arr) => {
        console.log(arr)
        let valid = true;
        arr.forEach(el => {
            if (!this.isNewApplServiceValueIsValid(el.applServiceValue, el.type)) valid = false;
            return
        });
        return valid
    }

    // подготовка данных для отправки на сервер
    submitHandler = () => {
        const { additionalConditions, status, bindings, mailingName } = this.state;
        const isValid = this.chekValidity(additionalConditions);
        const mailing =  { additionalConditions, status, bindings, mailingName };
        if (!mailingName)  notification(error, mailingNameError)
        else if (!status)  notification(error, statuseError)
        else if (!isValid)  notification(error, emptyCanditionError)
        else if (!bindings.length)  notification(error, quantityBindError)
        // else this.props.sendNewMailing(mailing)
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
                        datePickerHandler={this.datePickerHandler}
                        showInnerCatalog={this.showInnerCatalog}
                        sabSelectHandler={this.sabSelectHandler}
                        sabSelectHandlerForNewCondition={this.sabSelectHandlerForNewCondition}
                        deleteInnerCatalog={this.deleteInnerCatalog}
                        deleteInnerCatalogForNewCondition={this.deleteInnerCatalogForNewCondition}
                        showInnerCatalogForNewCondition={this.showInnerCatalogForNewCondition}
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
                        <Button className='submit' onClick={this.submitHandler}>Сохранить</Button>
                    </div>
                </div> }
            </React.Fragment>
        )
    }

    componentDidMount () {
        const id = this.props.match.params.id;
        this.props.getMailingItemConfigurationOptions(id)
    }

    // сравнивает стэйт компонента и данные из стора 
    // и если есть элементы с одинаковыми id то берет элемнет из стэйта компонента
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
})(AddMailind));


AddMailind.propTypes = {
    getMailingItemConfigurationOptions: PropTypes.func,
    changeApplServiceArr: PropTypes.func,
    addNewCondition: PropTypes.func,
    addNewBinding: PropTypes.func,
    removeCondition: PropTypes.func,
    sendNewMailing: PropTypes.func,
    removeBinding: PropTypes.func,
    bindings: PropTypes.array,
    companies: PropTypes.array,
    additionalConditions: PropTypes.array,
    operators: PropTypes.array,
    applServicesArrays: PropTypes.object,
    applServices: PropTypes.array,
    statuses: PropTypes.array,
    loading: PropTypes.bool,
    status: PropTypes.string,
    mailingName: PropTypes.string,
}