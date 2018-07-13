import React, { Component } from 'react'
import {BrowserRouter} from 'react-router-dom'
import Authenticated from '../components/Security/Authentication/Authenticated'
// import UnAuthenticated from '../components/Security/Authentication/UnAuthenticated'
import {Switch, Route} from 'react-router-dom'

import './styles/app.less'


class App extends Component {
    render() {
        return (
            <BrowserRouter >
                <div>
                    <Switch>
                        {/* <Route path="/login" exact component={UnAuthenticated}/> */}
                        <Route path="*" component={Authenticated} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App