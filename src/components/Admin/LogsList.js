import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DatePicker, Col, Row, Button, Icon  } from 'antd';
import { getlogsList } from '../../actions/index'
import { error, dateSizeError } from '../../utils/constants'
import notification from '../Layout/notification/notification'

import moment from 'moment';

const accessGroupLoader = <Icon className='iconStyle accessGroupLoader' type="loading" />

const dateFormat = 'DD/MM/YYYY';
const presentDate = new Date(Date.now());
const presentMonth = presentDate.getMonth()+1;
const presentYear = presentDate.getFullYear();
const presentDay = presentDate.getDate();

class LogsList extends Component {
    state = {
        momentStart: `01/${presentMonth}/${presentYear}`,
        momentEnd: `${presentDay}/${presentMonth}/${presentYear}`,
    }

    datePickerHandler = (data, name) => this.setState({[name]: data})

    applyFilter = () => {
        const { momentStart, momentEnd } = this.state;
        const valid = moment(momentStart, ['DD/MM/YYYY']).isBefore(moment(momentEnd, ['DD/MM/YYYY']));
            if (!valid) { 
                notification(error, dateSizeError)
            } else this.props.getlogsList({momentStart, momentEnd});
    }

    componentDidMount () {
        this.applyFilter()
    }
    render() {
        const datePick = (name) => <DatePicker
            format={dateFormat} 
            defaultValue={moment(this.state[name], dateFormat)}
            onChange={(e, data) => this.datePickerHandler(data, name)} />

        const { logsList, accessGroupLoading } = this.props;
        return (
            <div className='logWraper'>
                <Row>
                    <Col span={24}>
                        <h1>Период:</h1>
                        <span className='text'>С</span>
                        {datePick('momentStart')}
                        <span className='text'>по</span>
                        {datePick('momentEnd')}
                        <Button onClick={this.applyFilter} className='filterBtn'>Фильтровать</Button>
                    </Col>
                </Row>
                <Row className='logsListRow'>
                    <Col span={24}>
                        <h1 className='logsListHeader'>Лог добавления контактов в компании Reply:</h1>
                    </Col>
                    <Col span={24}>  
                        <div className='logsListContent'>
                        {
                            accessGroupLoading ? accessGroupLoader : 
                                logsList.map((el, index) => <p key={index}>{el.text}</p>)
                        }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    logsList: state.adminPage.logsList,
    accessGroupLoading: state.adminPage.accessGroupLoading,
})

export default connect(mapStateToProps, {
    getlogsList,
})(LogsList)

LogsList.propTypes = {
    logsList: PropTypes.array,
    accessGroupLoading: PropTypes.bool,
}