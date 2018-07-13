import { LOAD_ALL_MAILING_ITEMS, DELETE_MAILING_ITEM, SUCCESS, MAILING_LOADER } from "../utils/constants";

 
const defaultState = {
    mailingList: [],
    loading: false
};

export default (mailingListState = defaultState, action) => {
    const {type, data} = action;

    switch (type) {
        case MAILING_LOADER:
            return {
                ...mailingListState,
                loading: true
            };
        case LOAD_ALL_MAILING_ITEMS + SUCCESS:
            return {
                ...mailingListState,
                loading: false,
                mailingList: data
            };
        case DELETE_MAILING_ITEM + SUCCESS:
            return {
                ...mailingListState,
                loading: false,
                mailingList: mailingListState.mailingList.filter(el => el.id !== data)
            };
        default:
            return mailingListState;
    }
}



