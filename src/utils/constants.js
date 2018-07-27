export const BACK_HOST = process.env.REACT_APP_BACK_HOST;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_URL = process.env.REACT_APP_API_URL;
export const PUP_URL = process.env.REACT_APP_PUP_URL;

//account
export const ACCOUNT_DELETE = 'ACCOUNT_DELETE';
export const ACCOUNT_ADD = 'ACCOUNT_ADD';
export const ACCOUNT_EDIT = 'ACCOUNT_EDIT';
export const ACCOUNTS_LOADER = 'ACCOUNT_EDIT';
export const LOAD_ALL_ACCOUNTS = 'LOAD_ALL_ACCOUNTS';

export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

//mailing
export const LOAD_ALL_MAILING_ITEMS = 'LOAD_ALL_MAILING_ITEMS';
export const DELETE_MAILING_ITEM = 'DELETE_MAILING_ITEM';
export const MAILING_LOADER = 'MAILING_LOADER';

//variables
export const LOAD_ALL_VARIABLES = 'LOAD_ALL_VARIABLES';
export const VARIABLES_LOADER = 'VARIABLES_LOADER';
export const VARIABLE_DELETE = 'VARIABLE_DELETE';
export const VARIABLE_ADD = 'VARIABLE_ADD';
export const VARIABLE_EDIT = 'VARIABLE_EDIT';

//add mailing page
export const MAILING_CONFIGURATION_OPTIONS = 'MAILING_CONFIGURATION_OPTIONS';
export const MAILING_CONFIGURATION_OPTIONS_LOADER = 'MAILING_CONFIGURATION_OPTIONS_LOADER';
export const GET_NEW_SERVICE_ARR = 'GET_NEW_SERVICE_ARR';
export const ADD_NEW_CONDITION = 'ADD_NEW_CONDITION';
export const REMOVE_CONDITION = 'REMOVE_CONDITION';
export const REMOVE_BINDING = 'REMOVE_BINDING';
export const ADD_NEW_BINDING = 'ADD_NEW_BINDING';

// admin
export const ADMIN_LOADER = 'ADMIN_LOADER';
export const LOAD_ALL_ACCESSES = 'LOAD_ALL_ACCESSES';
export const LOAD_ACCESS_GROUP = 'LOAD_ACCESS_GROUP';
export const ACTIVE_ACCESS_GROUP = 'ACTIVE_ACCESS_GROUP';
export const ACCESS_GROUP_LOADER = 'ACCESS_GROUP_LOADER';
export const DELETE_ACCESS_GROUP_USER = 'DELETE_ACCESS_GROUP_USER';
export const UPDATE_USER_ACCESS_GROUP = 'UPDATE_USER_ACCESS_GROUP';
export const GET_LOGS_LIST = 'GET_LOGS_LIST';

//authorization
export const AUTHENTICATED = 'AUTHENTICATED';
export const ROLE_USER = 'ROLE_USER';
export const ROLE_RESP = 'ROLE_RESPONSIBLE';
export const ROLE_ADMIN = 'ROLE_ADMIN';


// error messages variables
export const error = 'error'
export const formatError = 'и соответствовать формату'
export const emptyError  = 'Все поля должны быть заполнены'
export const emptyCanditionError  = 'Все поля в условиях должны быть заполненны'
export const statuseError  = 'Статус рассылки не должен быть пустым'
export const mailingNameError  = 'Название рассылки не должно быть пустым'
export const quantityBindError  = 'Должна быть миннимум одна привязка'
export const dateSizeError  = 'Минимальное значение не должно быть больше максимального'