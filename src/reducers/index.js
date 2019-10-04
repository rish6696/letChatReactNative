import {combineReducers} from 'redux'
import Types from '../actions/types';
import {GiftedChat} from 'react-native-gifted-chat';



const messageSupply=(PreviousMessages=[],action)=>{
  switch (action.type) {
      case Types.SEND_MESSAGE:
          return GiftedChat.append(PreviousMessages,action.payload);
     case Types.MESSAGE_RECIEVED:
         return GiftedChat.append(PreviousMessages,action.payload);
  
      default:
         return PreviousMessages
  }
}


const connectSocket=(socketState=null,action)=>{
    
    switch (action.type) {
        case Types.CONNECT_SOCKET:
            return {
                socket:action.payload
            }
        default:
            return socketState        
    }

}
const currentUser=(currentUser=null,action)=>{
   
        switch (action.type) {
            case Types.CURRENT_USER:
                return {
                    ... action.payload
                }
        
            default:
           return  currentUser
        }
}



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

const fetchUsers=(state=null,action)=>{
  switch (action.type) {
      case Types.FETCH_USERS:
          return {
           users:action.payload,
           status:true
        }

        case Types.ERROR_WHILE_FETCH:
            return {
               status:false
            }
  
      default:
          return state
  }
}

export default combineReducers({
    GoogleSignAuth,fetchUsers,connectSocket,currentUser,messageSupply
})