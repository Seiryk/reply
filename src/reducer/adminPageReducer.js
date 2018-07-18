import {  
    ADMIN_LOADER,
    LOAD_ALL_ACCESSES,
    ACTIVE_ACCESS_GROUP, 
    ACCESS_GROUP_LOADER,
    GET_LOGS_LIST,
    DELETE_ACCESS_GROUP_USER,
    UPDATE_USER_ACCESS_GROUP,
    LOAD_ACCESS_GROUP,   
    SUCCESS
 } from "../utils/constants";


const defaultState = {
allAccesses: [],
accessUsers: [],
logsList: [],
loading: false,
accessGroupLoading: false,
allAccessGroups: {},
activeAccessGroup: ''
};

export default (adminState = defaultState, action) => {
const {type, data} = action;

switch (type) {
  case ADMIN_LOADER:
      return {
          ...adminState,
          loading: true,
      };
  case ACCESS_GROUP_LOADER:
      return {
          ...adminState,
          accessGroupLoading: true,
      };
  case LOAD_ALL_ACCESSES + SUCCESS:
      return {
          ...adminState,
          loading: false,
          allAccesses: data.allAccesses,
          accessUsers: data.accessUsers,
      };
  case LOAD_ACCESS_GROUP + SUCCESS:
      return {
          ...adminState,
          accessGroupLoading: false,
          activeAccessGroup: data.activeAccessGroup,
          allAccessGroups: {
              ...adminState.allAccessGroups,
            [data.activeAccessGroup]: data.accessGroup
          }
      };
  case UPDATE_USER_ACCESS_GROUP + SUCCESS:
      return {
          ...adminState,
          accessGroupLoading: false,
          allAccessGroups: {
              ...adminState.allAccessGroups,
            [data.name]: [...adminState.allAccessGroups[data.name], {name: Date.now(), id: Date.now()}]
          }
      };
  case ACTIVE_ACCESS_GROUP:
      return {
          ...adminState,
          accessGroupLoading: false,
          activeAccessGroup: data.activeAccessGroup
      };
  case DELETE_ACCESS_GROUP_USER + SUCCESS:
      return {
          ...adminState,
          accessGroupLoading: false,
          allAccessGroups: {
            ...adminState.allAccessGroups,
          [data.accessGroup]: adminState.allAccessGroups[data.accessGroup].filter(el => el.id !== data.id)
        }
      };
  case GET_LOGS_LIST + SUCCESS:
      return {
          ...adminState,
          accessGroupLoading: false,
          logsList: data
      };
  default:
      return adminState;
}
}



