import * as api from '../utils/axios/axios';
import { ACCOUNT_ADD, ACCOUNT_DELETE, ACCOUNT_EDIT, SUCCESS, LOAD_ALL_ACCOUNTS, ACCOUNTS_LOADER } from '../utils/constants';

const arr = [
    {
        name: 'rest@gmail.com',
        APIkey: 'mfjvkjdnvjdnl',
        id: '3',
    },
    {
        name: 'qwerty@gmail.com',
        APIkey: '84cscfwcsfsf4d',
        id: '9',

    },
    {
        name: 'asdfg@gmail.com',
        APIkey: 'b4brhr.ghthh',
        id: '4',

    },
]; 

//  создание аккаунта
export const createAccount = (arg) => dispatch => {
    console.log(arg)
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
    dispatch({ type: ACCOUNTS_LOADER});
    setTimeout(()=> {
        dispatch({ type: ACCOUNT_ADD + SUCCESS, data: arg });
    },1000)
        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}
// загрузка всех аккаунтов
export const loadAllAccounts = () => dispatch => {
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
    dispatch({ type: ACCOUNTS_LOADER});
    setTimeout(()=> {
        dispatch({ type: LOAD_ALL_ACCOUNTS + SUCCESS, data: arr });
    },1000)
        // dispatch({ type: ADD_USER, data: resp.data });
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}
// удаление аккаунта
export const deleteAccount = (id) => dispatch => {
    console.log(id)
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
        dispatch({ type: ACCOUNTS_LOADER});
        setTimeout(()=> {
            dispatch({ type: ACCOUNT_DELETE + SUCCESS, data: id });
        },1000)
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}

// изменение аккаунта
export const editAccount = (arg) => dispatch => {
    console.log(arg)
    // api.post(arg, 'url', (resp) => {
    //     alert('user added');
        // dispatch({ type: ADD_USER, data: resp.data });
        dispatch({ type: ACCOUNTS_LOADER});
        setTimeout(()=> {
            dispatch({ type: ACCOUNT_EDIT + SUCCESS, data: arg });
        },1000)
    //   }
    //   , (err) => {
    //     console.log(err);
    //   });
}

