import Types from './types';
import apis from '../apis/index'
//import NavigationService from '../services/NavigationService'
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from 'react-native-google-signin';
import {Toast} from 'native-base';
import Constants from '../constants';


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

 export default {
     GoogleSignIn,googleSignOut
 }