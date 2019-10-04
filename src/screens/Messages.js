import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../constants' 
import {connect} from 'react-redux';
import Actions from '../actions/index';
import {ActivityIndicator} from 'react-native';
 
class Example extends React.Component {

  state= { messages:[] }

  
  componentDidMount(){
     this.props.getCurrentUser();   
    
 }
  onSendMessage=(Messages=[])=>{
    
     
     const { socket }=this.props;
     this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, Messages),
    }))
    socket.emit('sending_chat',Messages);
    
     
  }

  onMessageRecived=(Messages=[])=>{
    console.log('chat recieved',Messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, Messages),
    }))
  }
 
  render() { 
    console.log(this.props,"theese hsjjs")

    if(this.props.currentUser===null){
        return (
             <ActivityIndicator></ActivityIndicator>
           )
    } else{
      return (
        <GiftedChat
          messages={this.props.Messages}
          onSend={this.props.sendMessage}
          user={{
            _id: this.props.currentUser.userID,
          }}
        />
      )
    }
   
  }
}

const mapStateToProps=(reducersState)=>{
  console.log(reducersState,"******************************")
  return {
    currentUser:reducersState.currentUser,
    Messages:reducersState.messageSupply
    
  }
}

const mapActionToProps={
  getCurrentUser:Actions.getCurrentUser,
  sendMessage:Actions.sendMessage
}



export default connect(mapStateToProps,mapActionToProps)(Example)