import React from 'react'
import PropTypes from 'prop-types'
import { Input, Icon } from 'antd';


const MailingName = (props) => {
    const { 
        editMailingName,
        mailingName,
        changeHandlerForNewVals,
        makeMailingNameEditable,
     } = props;
    return(
        <div className='mailingNameWrap'>
            <div className='mailingName'>
            {
                editMailingName ? <Input 
                    name='mailingName' 
                    placeholder={'Название расылки'}
                    onChange={(e) => changeHandlerForNewVals(e.target.name, {selectedVal: e.target.value})} 
                    value = {mailingName} /> : <p>{mailingName}</p>
            }
            </div>
            <div className='mailingName'>
                <Icon
                    className='iconStyle'
                    type={editMailingName ? "check" : "edit"} 
                    onClick={makeMailingNameEditable} />
            </div>
        </div>
    )
}

export default MailingName;

MailingName.propTypes = {
    mailingName: PropTypes.string,
    editMailingName: PropTypes.bool,
    changeHandlerForNewVals: PropTypes.func,
    makeMailingNameEditable: PropTypes.func,
}
