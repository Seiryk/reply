import * as api from '../utils/axios/axios';
import { LOAD_ALL_VARIABLES, VARIABLE_ADD, VARIABLE_DELETE, VARIABLE_EDIT, SUCCESS, VARIABLES_LOADER } from '../utils/constants';
const vars = {
    fieldsName: [
        {
            text: 'field 1',
            value: 'field 1'
        },
        {
            text: 'field 2',
            value: 'field 2'
        },
        {
            text: 'field 3',
            value: 'field 3'
        },
    ],
    projectsName: [
        {
            text: 'project 1',
            value: 'project 1'
        },
        {
            text: 'project 2',
            value: 'project 2'
        },
        {
            text: 'project 3',
            value: 'project 3'
        },
    ],
    variablesList: [
        {
            id: '7338',
            projectName: {
                text: 'project 2',
                value: 'project 2'
            },
            fieldName:         {
                text: 'field 3',
                value: 'field 3'
            },
        },
        {
            id: '4341',
            projectName: {
                text: 'project 1',
                value: 'project 1'
            },
            fieldName:         {
                text: 'field 2',
                value: 'field 2'
            },
        },
    ]
}

// создание пользовательской переменной
export const createVariable = (arg) => dispatch => {
    console.log(arg)
    const data = {
        id: Date.now(),
        fieldName: {
            text: arg.fieldName,
            value: arg.fieldName,
        },
        projectName: {
            text: arg.projectName,
            value: arg.projectName,
        },
    };
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
    dispatch({ type: VARIABLES_LOADER});
    setTimeout(()=> {
        dispatch({ type: VARIABLE_ADD + SUCCESS, data });
    },1000)
        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}

//  получение всех пользовательских переменных
export const loadAllVariables = () => dispatch => {
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
    dispatch({ type: VARIABLES_LOADER});
    setTimeout(()=> {
        dispatch({ type: LOAD_ALL_VARIABLES + SUCCESS, data: vars });
    },1000)
        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}

// удаление пользовательской переменной
export const deleteVariable = (id) => dispatch => {
    console.log(id)
    // api.post(id, 'url', (resp) => {
    //     alert('user added');
        dispatch({ type: VARIABLES_LOADER});
        setTimeout(()=> {
            dispatch({ type: VARIABLE_DELETE + SUCCESS, data: id });
        },1000)
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}

// редактирование переменной
export const editVariable = (arg) => dispatch => {
    console.log(arg)
    const data = {
        id: arg.id,
        fieldName: {
            text: arg.fieldName,
            value: arg.fieldName,
        },
        projectName: {
            text: arg.projectName,
            value: arg.projectName,
        },
    };
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
        // dispatch({ type: ADD_USER, data: resp.data });
        dispatch({ type: VARIABLES_LOADER});
        setTimeout(()=> {
            dispatch({ type: VARIABLE_EDIT + SUCCESS, data });
        },1000)
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}