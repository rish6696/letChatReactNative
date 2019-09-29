import {combineReducers} from 'redux'
import Types from '../actions/types';



const GoogleSignAuth=(state=null,action)=>{
    switch (action.type) {
        case Types.GOOGLE_SIGNIN_COMPLETE:
            return {
                GoogleResponse:action.payload
            }
        case Types.GOOGLE_SIGNOUT:
            return {
                ...state
            }
    
        default:
            return state
    }

}

export default combineReducers({
    GoogleSignAuth
})