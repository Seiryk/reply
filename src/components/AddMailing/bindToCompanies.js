import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Tooltip, Icon, Input } from 'antd'
import Dropdown from '../UI/dropdown'
import AddButton from '../UI/addButton'
import EmptyRowBindings from './emptyRowBindings';
import './styles/addMailing.less'

const delayText = <span>Через сколько календарных дней контакт будет отправлен
    в компаню Reply из данной привязки. Каждая задержка считается относительно предыдущей компании.
</span>
const companyText = <span>В какую компанию Reply отправить e-mail из задачи-заявки.</span>

const ConditionBlock = (props) => {
    const blockTitle = (name, tooltip) => (
        <Col offset={4} span={4}>
            <div className='bindBlockTitles'>
                <span>{name}</span>
                <Tooltip 
                    title={tooltip}
                    placement='topRight'>
                    <Icon className='addConTitIcon' type="question-circle-o" />
                </Tooltip>
            </div>
        </Col>
    )
        const { 
            addEmptyRow,
            closeEmptyBindingRow,
            bindings,
            companies,
            addNewBinding,
            valuesForEmptyRowBindings,
            removeBinding,
            changeHandlerForOldVals,
            changeHandlerForNewVals,
         } = props
        return (
            <div className='conditionBlockWrapper'>
                <h1>Привязка к компаниям в Reply</h1>
                <Row>
                    {blockTitle('Задержка', delayText)}
                    {blockTitle('Компания', companyText)}
                </Row>
                {
                    bindings.map(el => {
                        return(
                            <Row className='conditionRowWrapper' key={el.id}>
                                <Col offset={4} span={4}>
                                <Input 
                                    type='number'
                                    name='delay'
                                    min={1}
                                    placeholder={'Задержка'}
                                    onChange={(e) => changeHandlerForOldVals(e.target.value, e.target.name, null, el.id )}
                                    value = {el.delay} />
                                </Col>
                                <Col offset={4} span={4}>
                                    <Dropdown 
                                        name='company'
                                        id={el.id}
                                        defaultValue={el.company} 
                                        options={companies}
                                        dropdownHandleChange={changeHandlerForOldVals}
                                        width={200}/>
                                </Col>
                                <Col offset={2} span={2}><Icon onClick={() => removeBinding(el)}  className='iconStyle' type='delete' /></Col>
                            </Row>
                        )
                    })
                }
                { 
                   valuesForEmptyRowBindings.emptyRowBinding || !bindings.length ? 
                   <EmptyRowBindings
                        companies={companies}
                        values={valuesForEmptyRowBindings}
                        addNewBinding={addNewBinding} 
                        closeEmptyBindingRow={closeEmptyBindingRow}
                        changeHandlerForNewVals={changeHandlerForNewVals}
                   /> :
                   <AddButton addFunc={() => addEmptyRow('emptyRowBinding')} offset={20} />
                }
            </div>
        )
}

export default ConditionBlock;

ConditionBlock.propTypes = {
    addEmptyRow: PropTypes.func,
    changeHandlerForOldVals: PropTypes.func,
    removeBinding: PropTypes.func,
    bindings: PropTypes.array,
    companies: PropTypes.array,
    valuesForEmptyRowBindings: PropTypes.object,
}