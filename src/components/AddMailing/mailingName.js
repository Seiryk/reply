import React from 'react'
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
                    onChange={(e) => changeHandlerForNewVals(e.target.value, e.target.name)} 
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

export default MailingName
