import {UNAUTHENTICATED, LOGOUT, LOGIN, BACK_HOST} from '../constants'
import history from '../history';

/**
 * Middleware для выполнения запросов к graphqAPI
 * @param store
 */
export default store => next => action => {
    const {queryString, type, ...rest} = action;

    /**
     * @TODO не лучшее место для перехвата
     */
    if (type === UNAUTHENTICATED) {
        localStorage.setItem('tokenRedirectUrl', window.location.href);
        history.push('/login');
    }

    if (type === LOGIN) {
        window.location.replace(BACK_HOST + '/token/new')
    }

    if (type === LOGOUT) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        history.push('/login');
    }
}



