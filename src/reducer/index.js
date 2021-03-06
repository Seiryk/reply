import {combineReducers} from 'redux'
import mailing from './mailingReducer'
import allAccounts from './allAccountsReducer'
import variables from './variablesReducer'
import addMailing from './addMailingReducer'
import adminPage from './adminPageReducer'
import authorization from './authorizationReducer'

export default combineReducers({
    mailing,
    allAccounts,
    variables,
    addMailing,
    adminPage,
    authorization
})
