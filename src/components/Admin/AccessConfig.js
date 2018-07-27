import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Row, Col, Menu, Icon } from 'antd'
import { loadAllAccesses, loadAccessGroup, deleteUser, updateUserAccessGroups } from '../../actions/index'
import Spiner from '../Layout/Spiner/spiner'
import ConfigurationUsersAccess from './ConfigurationUsersAccess'
import ShowAccessSavedAccouns from './ShowAccessSavedAccouns'
import { deleteSelectedItem } from '../../utils/additionalFunctions'

const accessGroupLoader = <Icon className='iconStyle accessGroupLoaderAccess' type="loading" />

class AccessConfig extends Component {
    state = {selectedUserForAdding: {}}
    //  отображение меню с доступами
    renderListOfAccesses = (allAccesses) => {
        return allAccesses.map(el => {
            return (
                <Menu.Item title={el.text} className='accessMenuItem'
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
    // удаление пользователя из списка пользователей определенного доступа
    deleteUser = (id, accessGroup) => {
        const obj = {id, accessGroup};
        const message = 'пользователя';
        deleteSelectedItem(obj, message, this, this.props.deleteUser);
    }
    componentDidMount() {
        this.props.loadAllAccesses();        
    }
// получение списка пользователей определенного доступа
    loadAccessGroup = (groupName) => {
        this.props.loadAccessGroup(groupName);
    }
 // добавление пользователя в список пользователей определенного доступа
    addNewUserAccess = () => {
        const {selectedUserForAdding} = this.state;
        this.props.updateUserAccessGroups(selectedUserForAdding);
    }
// оброботчик селекта
    dropdownHandleChange = (name, {selectedVal: value}) => {
        this.setState({
            selectedUserForAdding: {name, value}
        })
    }

    render() {
        const { loading, allAccesses, accessGroupLoading, activeAccessGroup, allAccessGroups, accessUsers } = this.props;
        const { selectedUserForAdding } = this.state;
        const RenderContent = activeAccessGroup === 'accessSavedAccouns' ?
                                                    <ShowAccessSavedAccouns
                                                        activeAccessGroup={activeAccessGroup}
                                                        allAccessGroups={allAccessGroups}
                                                    /> : 
                                                    <ConfigurationUsersAccess
                                                        selectedUserForAdding={selectedUserForAdding}
                                                        accessGroupLoading={accessGroupLoading}
                                                        accessUsers={accessUsers}
                                                        activeAccessGroup={activeAccessGroup}
                                                        allAccessGroups={allAccessGroups}
                                                        deleteUser={this.deleteUser}
                                                        addNewUserAccess={this.addNewUserAccess}
                                                        dropdownHandleChange={this.dropdownHandleChange}/>
        return (
            <div>
                {
                    loading ? <Spiner/> : 
                    <Row>
                        <Col span={7}>
                            <div className='listOfAccesses'>
                                <Menu
                                    selectedKeys={[activeAccessGroup]}
                                    mode="vertical">
                                        {this.renderListOfAccesses(allAccesses)}
                                </Menu>
                            </div>
                        </Col>
                        {
                            accessGroupLoading ? accessGroupLoader : RenderContent
                        }

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