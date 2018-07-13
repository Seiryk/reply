import React, { Component } from 'react'
import { Icon, Row, Col } from 'antd';
import {connect} from 'react-redux';
import Spiner from '../../Layout/Spiner/spiner';

import { deleteMailingItem, getMailingItems } from '../../../actions/index'
import { getMailingState } from '../../../selectors/index'
import { deleteSelectedItem } from '../../../utils/additionalFunctions'
import  AddBtn  from '../../UI/addButton'

class MailingList extends Component {

    editMailingItem = ({id}) => {
        this.props.history.push('/mailing/edit/' + id)
    }
    deleteMailingItem = ({id}) => {
        const message = 'рассылку';
        deleteSelectedItem(id, message, this, this.props.deleteMailingItem)
    }

    addNewMailing = () => {
        this.props.history.push('/mailing/add')
    }

    componentDidMount(){
        const { id, getMailingItems } = this.props;
        getMailingItems(id);
    }
    render() {
        const { mailingState: {loading, mailingList}, title } = this.props;
        return (
            <div>
                {
                    loading ? <Spiner />: null
                }
                {
                mailingList.length ? 
                    <React.Fragment>
                            <h1 className='title'>{title}</h1>
                            <div className='tableWraper'>
                                {
                                    mailingList.map(el => {
                                        return(
                                            <div key={el.id} className='rowWraper'>
                                                <Row gutter={48}>
                                                    <Col offset={6} span={6}>
                                                        {el.name}
                                                    </Col>
                                                    <Col span={6}>
                                                        <Icon
                                                            className='iconStyle'
                                                            type="edit"
                                                            onClick={(e) => this.editMailingItem(el)} />
                                                        <Icon 
                                                            style={{marginLeft: 10}}
                                                            className='iconStyle'
                                                            type="delete"
                                                            onClick={(e) => this.deleteMailingItem(el) } />
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                                <AddBtn offset={16} addFunc={this.addNewMailing} />
                            </div>
                        </React.Fragment> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        mailingState: getMailingState(state),
    }
}

export default connect(mapStateToProps, {
    deleteMailingItem,
    getMailingItems
})(MailingList);