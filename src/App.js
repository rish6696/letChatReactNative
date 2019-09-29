import React from 'react'
import {Provider} from 'react-redux'
import { createStore,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
//import NavigationService from './services/NavigationService'

import Container from './container'
import reducers from './reducers/index'

const store=createStore(reducers,applyMiddleware(ReduxThunk))

class AppComponent extends React.Component {
   
    render(){
        return(
            <Provider store={store}>
                <Container   
                 /> 
            </Provider>
        )
    }
}

export default AppComponent


