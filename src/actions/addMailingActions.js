import * as api from '../utils/axios/axios';
import { MAILING_CONFIGURATION_OPTIONS, 
        ADD_NEW_CONDITION,
        ADD_NEW_BINDING,
        GET_NEW_SERVICE_ARR,
        SUCCESS, 
        REMOVE_BINDING,
        MAILING_CONFIGURATION_OPTIONS_LOADER,
        REMOVE_CONDITION } from '../utils/constants';
import {newdata, olddata} from './data'




export const getMailingItemConfigurationOptions = (id) => dispatch => {
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
    dispatch({ type: MAILING_CONFIGURATION_OPTIONS_LOADER});
    setTimeout(()=> {
        if (id) dispatch({ type: MAILING_CONFIGURATION_OPTIONS + SUCCESS, data: olddata });
        else dispatch({ type: MAILING_CONFIGURATION_OPTIONS + SUCCESS, data: newdata });
    },1000)
        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
  }

export const sendNewMailing = (data) => dispatch => {
    console.log(data);
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');

        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
  }


  const newArr = [
    {
        text: 'new appl service 5',
        value: 'new_appl_service_5'
    },
    {
        text: 'new other for appl service5',
        value: 'new_other_appl_service_5'
    }
]
export const changeApplServiceArr = (val) => (dispatch) => {
    dispatch({ type: MAILING_CONFIGURATION_OPTIONS_LOADER});
    setTimeout(()=> {
        const obj = {val, newArr}
        dispatch({ type: GET_NEW_SERVICE_ARR + SUCCESS, data: obj });
    },2000) 
}

export const addNewCondition = (obj) => (dispatch) => {
    dispatch({ type: ADD_NEW_CONDITION + SUCCESS, data: obj });
}

export const addNewBinding = (obj) => (dispatch) => {
    dispatch({ type: ADD_NEW_BINDING + SUCCESS, data: obj });
}

export const removeCondition = ({id, unSaved}) => (dispatch) => {
    if (unSaved) {
        dispatch({ type: REMOVE_CONDITION + SUCCESS, data: id });
    } else {
        dispatch({ type: MAILING_CONFIGURATION_OPTIONS_LOADER});
        setTimeout(()=> {
            dispatch({ type: REMOVE_CONDITION + SUCCESS, data: id });
        },2000)
    }
}

export const removeBinding = ({id, unSaved}) => (dispatch) => {
    if (unSaved) {
        dispatch({ type: REMOVE_BINDING + SUCCESS, data: id });
    } else {
        dispatch({ type: MAILING_CONFIGURATION_OPTIONS_LOADER});
        setTimeout(()=> {
            dispatch({ type: REMOVE_BINDING + SUCCESS, data: id });
        },2000)
    }
}