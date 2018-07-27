import React from 'react'
import {Col, Icon} from 'antd'
import Dropdown from '../UI/dropdown'

const ConfigurationUsersAccess = (props) => {
    const {
        selectedUserForAdding,
        accessUsers,
        dropdownHandleChange,
        allAccessGroups,
        activeAccessGroup,
        addNewUserAccess,
        deleteUser
    } = props;
    return (
        <React.Fragment>
            <Col offset={1} span={8}>
                <div className='accessGroupName'>
                    {
                        !!activeAccessGroup ? allAccessGroups[activeAccessGroup].map(el => {
                            return (
                                <div key={el.id}>
                                    <span>{el.name}</span>
                                     <Icon onClick={() => deleteUser(el.id, activeAccessGroup)} className='accessIconStyle' type="delete" />
                                </div>
                            )
                        }) : null
                    }
                </div>
            </Col>
            <Col offset={1} span={7}>
                {activeAccessGroup ? <div className='addNewUserAccess'>
                    <h1>Добавить сотрудника</h1>
                    <div style={{marginLeft: 20}}>
                        <Dropdown defaultValue={selectedUserForAdding.value} 
                            name={activeAccessGroup} 
                            dropdownHandleChange={dropdownHandleChange} 
                            options={accessUsers} width={200} />
                    </div>                           
                    <div className='icons'>
                        {Object.keys(selectedUserForAdding).length ?
                            <Icon
                                className='iconStyle'  
                                type="check"
                                onClick={addNewUserAccess} /> : null}
                    </div>
                </div> : null}
            </Col>
        </React.Fragment>
    )
}

export default ConfigurationUsersAccess