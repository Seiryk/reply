import { LOAD_ALL_VARIABLES, VARIABLE_ADD, VARIABLE_DELETE, VARIABLE_EDIT, SUCCESS, VARIABLES_LOADER } from "../utils/constants";

const defaultState = {
    variablesList: [],
    projectsName: [],
    fieldsName: [],
    loading: false
};

export default (variablesState = defaultState, action) => {
    const {type, data} = action;

    switch (type) {
        case VARIABLES_LOADER:
            return {
                ...variablesState,
                loading: true
            };
        case LOAD_ALL_VARIABLES + SUCCESS:
            return {
                ...variablesState,
                loading: false,
                ...data,
                variablesList: data.variablesList.map(el => ({...el, edit: false}))
            };
        case VARIABLE_DELETE + SUCCESS:
            return {
                ...variablesState,
                loading: false,
                variablesList: variablesState.variablesList.filter(el => el.id !== data)
            };
        case VARIABLE_EDIT + SUCCESS:
            return {
                ...variablesState,
                loading: false,
                variablesList: variablesState.variablesList.map(el => {
                    if (el.id === data.id) return data;
                    else return el;
                })
            };
        case VARIABLE_ADD + SUCCESS:
            return {
                ...variablesState,
                loading: false,
                variablesList: [...variablesState.variablesList, data]
            };
        default:
            return variablesState;
    }
}



