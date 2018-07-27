import React from 'react'
import {Collapse, Col} from 'antd'

const Panel = Collapse.Panel;


const ShowAccessSavedAccouns = (props) => {
    const {activeAccessGroup, allAccessGroups} = props;
    return (
        <Col offset={1} span={12}>
            <div className='accessSavedAccouns'>
                <h1>
                    Сотрудники и доступы к аккаунтам
                </h1>
                <Collapse  bordered={false}>
                    {
                        allAccessGroups[activeAccessGroup].map((user, index) => {
                            return(
                                <Panel key={index} header={user.name}>
                                    {user.accounts.map(accountEmail => <p key={accountEmail}>{accountEmail}</p>)}
                                </Panel>
                            )
                        })
                    }
                </Collapse>
            </div>
        </Col>
    )
}

export default ShowAccessSavedAccouns