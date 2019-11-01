import Types from './types';
import apis from '../apis/index'
//import NavigationService from '../services/NavigationService'
import AsyncStorage from '@react-native-community/async-storage';

import { GoogleSignin } from 'react-native-google-signin';
import {Toast} from 'native-base';
import Constants from '../constants';
import constants from '../constants';
import store from '../store'
import { Actions } from 'react-native-gifted-chat';
import io from 'socket.io-client'




function GoogleSignIn(GoogleSignin,statusCodes,navigation){
      return async (dispatch)=>{
        try {
            const avail=await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { data }=await apis.loginGoogle(userInfo.idToken,'google')
            await AsyncStorage.setItem(Constants.CURRENT_USER,JSON.stringify(data))
            dispatch({type:Types.GOOGLE_SIGNIN_COMPLETE,payload:data})
            navigation.navigate('mainFlow');
          } 
          catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              console.log('there is some other',error)
            }
          }
      }

 }

 function googleSignOut(navigation){
   return async (dispatch)=>{
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem(Constants.CURRENT_USER);
        dispatch({type:Types.GOOGLE_SIGNOUT,payload:true})
        navigation.navigate('auth')
         // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    
   }

 }

 const onMessagerecieved=(Message)=>{
   console.log('this is the message inside action',Message)
   store.dispatch({type:Types.MESSAGE_RECIEVED,payload:Message})
   
 }

 function fetchUsers(pgNo){
   return async (dispatch)=>{
     try {
        const stringObject=await AsyncStorage.getItem(Constants.CURRENT_USER);
        const {jwtToken}=JSON.parse(stringObject)
        const { data }=await apis.fetchUsers(pgNo,jwtToken);
        if(data.status){
          dispatch({type:Types.FETCH_USERS,payload:data.data})
        }else{
          dispatch({type:Types.ERROR_WHILE_FETCH,payload:error})
        }
        
     } catch (error) {
         dispatch({type:Types.ERROR_WHILE_FETCH,payload:error})
     }
     
   }

 }


 function connectSocket(){

   return (dispatch,getState)=>{
     const socket=io(Constants.SERVER_URL);
     socket.on('connect',()=>{
         dispatch({ type:Types.CONNECT_SOCKET, payload:socket })
     })
    // socket.on('chat_recieved',onMessagerecieved)

   }

 }

 ///have to call get current user only once in the app

 function joinRoom(recieverId){
  return async (dispatch,getStore)=>{
    const strObj=await AsyncStorage.getItem(Constants.CURRENT_USER);
    const senderId=(JSON.parse(strObj)).userID;
    const {connectSocket}=getStore();
    const socket=connectSocket.socket;
    socket.emit('JOIN_CHAT',{
      reciever:recieverId,
      sender:senderId
    })

   socket.on('SAVE_ROOM_ID',(roomId)=>{
     console.log("recieved room id from server="+roomId)
     dispatch({type:Types.JOIN_ROOM,payload:roomId})
   })

   
  }

 }

 function getCurrentUser(){
   return async (dispatch)=>{
        const strObj=await AsyncStorage.getItem(Constants.CURRENT_USER);
        dispatch({type:Types.CURRENT_USER,payload:JSON.parse(strObj)})
   }
 }

//  function sendMessage(messageArray){
//        return (dispatch,getStore)=>{
//           const {connectSocket}=getStore();
//           const socket=connectSocket.socket;
//           socket.emit('sending_chat',messageArray)
//           dispatch({type:Types.SEND_MESSAGE,payload:messageArray})
//        }
//  }

 export default {
     GoogleSignIn,googleSignOut,fetchUsers,getCurrentUser,connectSocket,joinRoom
 }


 