import { AUTHENTICATED, BACK_HOST} from "../utils/constants";


/**
 * Пользователь нажал кнопку Login
 * @returns {{type}}
 */
export function logIn() {
    window.location.replace(BACK_HOST + '/token/new')
}

/**
 * Пользователь был успешнно аутентицифирован
 * @returns {{type}}
 */
export function authenticated() {
    return {
        type: AUTHENTICATED
    }
}

/**
 * Пользователь нажал кнопку Logout
 * @returns {{type}}
 */
export function logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenRedirectUrl');

}