import {  MAILING_CONFIGURATION_OPTIONS,
          GET_NEW_SERVICE_ARR, 
          MAILING_CONFIGURATION_OPTIONS_LOADER, 
          SUCCESS,
          ADD_NEW_BINDING,
          REMOVE_BINDING,
          ADD_NEW_CONDITION,
          REMOVE_CONDITION } from "../utils/constants";

 
const defaultState = {
    additionalConditions: [],
    statuses: [],
    status: '',
    mailingName: '',
    applServices: [],
    operators: [],
    applServicesArrays: {},
    loading: false,
    bindings: [],
    companies: [],
};

export default (addMailingState = defaultState, action) => {
    const {type, data} = action;

    switch (type) {
        case MAILING_CONFIGURATION_OPTIONS_LOADER:
            return {
                ...addMailingState,
                loading: true,
                status: null,
                mailingName: null,
            };
        case MAILING_CONFIGURATION_OPTIONS + SUCCESS:
            return {
                loading: false,
                ...data
            };
        case GET_NEW_SERVICE_ARR + SUCCESS:
            return {
                ...addMailingState,
                loading: false,
                applServicesArrays: {...addMailingState.applServicesArrays, ...{[data.val]: data.newArr}},
            };
        case ADD_NEW_CONDITION + SUCCESS:
            return {
                ...addMailingState,
                loading: false,
                additionalConditions: [...addMailingState.additionalConditions, data]
            };
        case ADD_NEW_BINDING + SUCCESS:
            return {
                ...addMailingState,
                loading: false,
                bindings: [...addMailingState.bindings, data]
            };
        case REMOVE_CONDITION + SUCCESS:
            return {
                ...addMailingState,
                loading: false,
                additionalConditions: addMailingState.additionalConditions.filter(el => {
                    return el.id !== data
                })
            };
        case REMOVE_BINDING + SUCCESS:
            return {
                ...addMailingState,
                loading: false,
                bindings: addMailingState.bindings.filter(el => {
                    return el.id !== data
                })
            };
        default:
            return addMailingState;
    }
}



