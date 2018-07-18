import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Row, Col, Menu, Icon } from 'antd'
import { loadAllAccesses, loadAccessGroup, deleteUser, updateUserAccessGroups } from '../../actions/index'
import Spiner from '../Layout/Spiner/spiner'
import Dropdown from '../UI/dropdown'
import { deleteSelectedItem } from '../../utils/additionalFunctions'

const accessGroupLoader = <Icon className='iconStyle accessGroupLoader' type="loading" />

class AccessConfig extends Component {
    state = {selectedUserForAdding: {}}
    renderListOfAccesses = (allAccesses) => {
        return allAccesses.map(el => {
            return (
                <Menu.Item
                    onClick={() => this.loadAccessGroup(el.value)}
                    key={el.value}>
                        <Icon type="user-add" />{el.text}
                </Menu.Item>
            )
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeAccessGroup !== nextProps.activeAccessGroup) {
            this.setState({selectedUserForAdding: {}})
        }
    }

    renderAccessGroup = () => {
        const { allAccessGroups, activeAccessGroup } = this.props;
        return allAccessGroups[activeAccessGroup].map(el => {
            return (
                <div key={el.id}>
                    <span>{el.name}</span>
                     <Icon onClick={() => this.deleteUser(el.id, activeAccessGroup)} className='accessIconStyle' type="delete" />
                </div>
            )
        })
    }
    deleteUser = (id, accessGroup) => {
        const obj = {id, accessGroup};
        const message = 'пользователя';
        deleteSelectedItem(obj, message, this, this.props.deleteUser);
    }
    componentDidMount() {
        this.props.loadAllAccesses();        
    }

    loadAccessGroup = (groupName) => {
        this.props.loadAccessGroup(groupName);
    }

    addNewUserAccess = () => {
        const {selectedUserForAdding} = this.state;
        this.props.updateUserAccessGroups(selectedUserForAdding);
    }

    dropdownHandleChange = (value, name) => {
        this.setState({
            selectedUserForAdding: {name, value}
        })
    }

    render() {
        const { loading, allAccesses, accessGroupLoading, activeAccessGroup, accessUsers } = this.props;
        const { selectedUserForAdding } = this.state;
        return (
            <div>
                {
                    loading ? <Spiner/> : 
                    <Row>
                        <Col span={4}>
                            <div className='listOfAccesses'>
                                <Menu
                                    selectedKeys={[activeAccessGroup]}
                                    mode="vertical">
                                        {this.renderListOfAccesses(allAccesses)}
                                </Menu>
                            </div>
                        </Col>
                        <Col offset={1} span={9}>
                            <div className='accessGroupName'>
                                {
                                    accessGroupLoading ? accessGroupLoader : 
                                    !!activeAccessGroup ? this.renderAccessGroup() : null
                                }
                            </div>
                        </Col>
                        <Col offset={1} span={9}>
                            {activeAccessGroup ? <div className='addNewUserAccess'>
                                <h1>Добавить пользователя</h1>
                                <div style={{marginLeft: 20}}>
                                    <Dropdown defaultValue={selectedUserForAdding.value} 
                                        name={activeAccessGroup} 
                                        dropdownHandleChange={this.dropdownHandleChange} 
                                        options={accessUsers} width={200} />
                                </div>                           
                                <div className='icons'>
                                    {Object.keys(selectedUserForAdding).length ?
                                        <Icon
                                            className='iconStyle'  
                                            type="check"
                                            onClick={this.addNewUserAccess} /> : null}
                                </div>
                            </div> : null}
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allAccesses: state.adminPage.allAccesses,
        accessUsers: state.adminPage.accessUsers,
        loading: state.adminPage.loading,
        accessGroupLoading: state.adminPage.accessGroupLoading,
        activeAccessGroup: state.adminPage.activeAccessGroup,
        allAccessGroups: state.adminPage.allAccessGroups
    }
}

export default connect(mapStateToProps, {
    loadAllAccesses,
    loadAccessGroup,
    deleteUser,
    updateUserAccessGroups,
})(AccessConfig);

AccessConfig.propTypes  = {
    loadAllAccesses: PropTypes.func,
    updateUserAccessGroups: PropTypes.func,
    loadAccessGroup: PropTypes.func,
    deleteUser: PropTypes.func,
    accessGroupLoading: PropTypes.bool,
    loading: PropTypes.bool,
    activeAccessGroup: PropTypes.string,
    accessUsers: PropTypes.array,
    allAccesses: PropTypes.array,
}