import {UNAUTHENTICATED, AUTHENTICATED, BACK_HOST} from "../utils/constants";
/**
 * Попытка выполнения действия требующего аутентификации без её наличия
 * @returns {{type}}
 */
export function unAuthenticated() {
    return {
        type: UNAUTHENTICATED
    }
}

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