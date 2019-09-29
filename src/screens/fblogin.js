import React, { Component } from 'react';
import { View ,Button} from 'react-native';
import { LoginButton , AccessToken, LoginManager } from 'react-native-fbsdk';

export default class Login extends Component {

    fbLoginmanager=()=>{
        LoginManager.logInWithPermissions(["public_profile","email"]).then(
            function(result) {
                console.log(result,"this is from manager")
              if (result.isCancelled) {

                console.log("Login cancelled");
              } else {
                console.log(
                  "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
              }
            },
            function(error) {
              console.log("Login fail with error: " + error);
            }
          );
    }
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile","email"]}
          onLoginFinished={
            (error, result) => {
                console.log('hello world')
                console.log(error)
                console.log(result)
              if (error) {
                console.log("login has error: " + result.error);
                alert('there is eror')
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
                alert('cancelled')
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                      alert('get token')
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            console.log("logout.")
            alert('logout')
          }}/>
          {/* <Button title='fb login' onPress={this.fbLoginmanager}></Button> */}
      </View>
    );
  }
};