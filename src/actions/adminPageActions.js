import * as api from '../utils/axios/axios';
import { 
     LOAD_ALL_ACCESSES,
     ACTIVE_ACCESS_GROUP,
     SUCCESS, 
     GET_LOGS_LIST,
     UPDATE_USER_ACCESS_GROUP,
     ACCESS_GROUP_LOADER,
     DELETE_ACCESS_GROUP_USER,
     ADMIN_LOADER, 
     LOAD_ACCESS_GROUP } from '../utils/constants';
import * as database from './data'

//  получение всех доступов для настройки доступов в админке
export const loadAllAccesses = () => dispatch => {
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
    dispatch({ type: ADMIN_LOADER});
    setTimeout(()=> {
        dispatch({ type: LOAD_ALL_ACCESSES + SUCCESS, data: {allAccesses: database.allAccesses, accessUsers: database.accessUsers} });
    },1000)
        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}

// получение списка пользователей конкретного доступа
export const loadAccessGroup = (activeAccessGroup) => (dispatch, getState) => {
    console.log(activeAccessGroup)
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
    const { adminPage: { allAccessGroups } } = getState();
    if (!allAccessGroups[activeAccessGroup]) {
        dispatch({ type: ACCESS_GROUP_LOADER});
        setTimeout(()=> {
            dispatch({ type: LOAD_ACCESS_GROUP + SUCCESS,
                 data: {accessGroup: database[activeAccessGroup], activeAccessGroup} });
        },1000)
    } else {
        dispatch({ type: ACTIVE_ACCESS_GROUP, data: {activeAccessGroup} });
    }
        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}

// удаление пользователя из списка доступов
export const deleteUser = ({id, accessGroup}) => (dispatch) => {
    dispatch({ type: ACCESS_GROUP_LOADER});
    setTimeout(()=> {
        dispatch({ type: DELETE_ACCESS_GROUP_USER + SUCCESS,
             data: {id, accessGroup} });
    },1000)
}


// добавление пользователя в список доступов
export const updateUserAccessGroups = ({name, value}) => (dispatch) => {
    dispatch({ type: ACCESS_GROUP_LOADER});
    if (name === 'replyAccessGroup') {
        setTimeout(()=> {
            dispatch({ type: UPDATE_USER_ACCESS_GROUP + SUCCESS,
                 data: {name, value} });
        },1000);
    } else if (name === 'adminAccessGroup') {
        setTimeout(()=> {
            dispatch({ type: UPDATE_USER_ACCESS_GROUP + SUCCESS,
                 data: {name, value} });
        },1000);
    }
}

// получение списка логов
export const getlogsList = (dateObj) => (dispatch) => {
    dispatch({ type: ACCESS_GROUP_LOADER});
        setTimeout(()=> {
            dispatch({ type: GET_LOGS_LIST + SUCCESS,
                 data: database.logsList});
        },1000);
}
