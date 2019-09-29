import React from 'react'
import { LoginButton , AccessToken, LoginManager } from 'react-native-fbsdk';
//import NavigationService from '../services/NavigationService'

import {View,Text,StyleSheet} from 'react-native'
class FacebookSignIn extends React.Component{

    loginButton = (error, result) => {
     if (error) {
      console.log("login has error: " + result.error);
      alert('there is eror')
    } else if (result.isCancelled) {
      console.log("login is cancelled.");
      alert('cancelled')
    } else {
         AccessToken.getCurrentAccessToken().then(
        (data) => {
           this.props.navigation.navigate('mainFlow')
       })
   }
 }
logOutButton=() => {
    console.log("logout.")
    alert('logout')
  }
    render(){
        return(
                <LoginButton
                    style={styles.facebookButton}
                    readPermissions={["public_profile","email"]}
                    onLoginFinished={this.loginButton}
                    onLogoutFinished={this.logOutButton}/>
        )
    }

 }
 const styles=StyleSheet.create({
    facebookButton:{
        height:40,
        width:242
    }
})
export default FacebookSignIn