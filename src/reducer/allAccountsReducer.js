import { ACCOUNT_ADD, ACCOUNT_EDIT, ACCOUNT_DELETE, SUCCESS, LOAD_ALL_ACCOUNTS, ACCOUNTS_LOADER } from "../utils/constants";

const defaultState = {
    allAccountsList: [],
    loading: false
};

export default (allAccountsState = defaultState, action) => {
    const {type, data} = action;

    switch (type) {
        case ACCOUNTS_LOADER:
            return {
                ...allAccountsState,
                loading: true
            };
        case LOAD_ALL_ACCOUNTS + SUCCESS:
            return {
                ...allAccountsState,
                loading: false,
                allAccountsList: data.map(el => ({...el, edit: false}))
            };
        case ACCOUNT_DELETE + SUCCESS:
            return {
                ...allAccountsState,
                loading: false,
                allAccountsList: allAccountsState.allAccountsList.filter(el => el.id !== data)
            };
        case ACCOUNT_EDIT + SUCCESS:
            return {
                ...allAccountsState,
                loading: false,
                allAccountsList: allAccountsState.allAccountsList.map(el => {
                    if (el.id === data.id) return data;
                    else return el;
                })
            };
        case ACCOUNT_ADD + SUCCESS:
            return {
                ...allAccountsState,
                loading: false,
                allAccountsList: [...allAccountsState.allAccountsList, {
                    ...data,
                    id: Date.now()
                }]
            };
        default:
            return allAccountsState;
    }
}



