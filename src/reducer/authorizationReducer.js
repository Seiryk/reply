import { AUTHENTICATED, ROLE_ADMIN, ROLE_USER } from "../utils/constants";

 
const defaultState = {
    user: {},
};

export default (authorizationState = defaultState, action) => {
    const {type} = action;
    switch (type) {
        case AUTHENTICATED:
            return {
                ...authorizationState,
                user: {...JSON.parse(localStorage.getItem('user')), userRoles: [ROLE_ADMIN, ROLE_USER]},
            };
        default:
            return authorizationState;
    }
}



