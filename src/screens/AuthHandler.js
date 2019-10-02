import React from 'react'
import {View,Text,Button,Image,StyleSheet,ActivityIndicator} from 'react-native'
import FacebookSignIn from '../components/FacebookSignIn'
//import NavigationService from '../services/NavigationService'
import AsyncStorage from '@react-native-community/async-storage';

import  GoogleSignin from "../components/GoogleSignin";

class Component extends React.Component {
    state={
        userInfo:null,isSigninInProgress:true  //it is mainly token fetching progress
    }
    async componentDidMount(){
        const JWT_TOKEN=await AsyncStorage.getItem('JWT_TOKEN')
        this.setState({isSigninInProgress:false})
        if(JWT_TOKEN){
            this.props.navigation.navigate('mainFlow');
        }
    }

    render(){
        console.log(this.props,"jbsjfijbjsbjbjb")
        
        if(!this.state.isSigninInProgress){
            return(
               <View style={styles.container}>
                <Text style={styles.title}>WeChat</Text>
                <Text style={styles.subtitle}>Keep the conversations going no matter where you are</Text>
                <Image style={styles.Image}  source={{uri:'https://www.viber.com/app/uploads/viber-logo.png'}}></Image>   
                <Image source={require('../assests/animation.gif')}></Image>  
                <GoogleSignin navigation={this.props.navigation}></GoogleSignin>
                <FacebookSignIn navigation={this.props.navigation} ></FacebookSignIn>
               
              </View>
            )
        }else{
            return(
                <ActivityIndicator size='large' ></ActivityIndicator>
            )
        }
    }
 }
 const styles=StyleSheet.create({
     subtitle:{
         fontSize:10,
         color:'#684E99',
         marginBottom:10
     },
     title:{
         fontSize:55,
         fontWeight:'400',
         color:'#684E95'
     },
     container:{
       flexDirection:'column',
       alignItems:'center'
     },
     Image:{
         height:100,
         width:100
     }
 })
export default Component