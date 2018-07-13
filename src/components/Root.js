import React, {Component} from 'react'
import {Provider} from 'react-redux'
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import App from './App'
import store from '../store'

moment.locale('ru');



class Root extends Component {
    render() {
        return (
            <Provider store = {store}>
                <LocaleProvider locale={ruRU}>
                    <App />
                </LocaleProvider>
            </Provider>
        )
    }
}

export default Root