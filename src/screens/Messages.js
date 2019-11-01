import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../constants' 
import {connect} from 'react-redux';
import Actions from '../actions/index';
import {ActivityIndicator} from 'react-native';
import io from 'socket.io-client';
 
class Example extends React.Component {

  state= { messages:[],socket:null,currentUser:null }


    componentDidMount(){
      const {navigation}=this.props;
      this.props.joinRoom(navigation.getParam('sendersId'));

      AsyncStorage.getItem(Constants.CURRENT_USER)
      .then(x=>JSON.parse(x))
      .then(x=>{
        this.setState({currentUser:x});
      })

      this.props.socket.on('recieved_chat',(messages)=>{
        this.onMessageRecived(messages);
      })
      
     //here i have to try using await so that i cannot use current user id before cuurent

  }
  onSend=(Messages=[])=>{
     const { socket,roomId }=this.props;
     this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, Messages),
     }))
    socket.emit('sending_chat',{message:Messages,roomId});
    
     
  }

  onMessageRecived=(Messages=[])=>{
    console.log('chat recieved',Messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, Messages),
    }))
  }
 
  render() { 
    console.log('room id is='+this.props.roomId);
    if(!this.props.roomId||!this.state.currentUser){
        return (
             <ActivityIndicator></ActivityIndicator>
           )
    } else{
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.currentUser.userID,
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
    Messages:reducersState.messageSupply,
    roomId:reducersState.joinRoom,
    socket:reducersState.connectSocket.socket
    
  }
}

const mapActionToProps={
  getCurrentUser:Actions.getCurrentUser,
  sendMessage:Actions.sendMessage,
  joinRoom:Actions.joinRoom
}



export default connect(mapStateToProps,mapActionToProps)(Example)