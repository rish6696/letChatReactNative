import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../constants' 
 
class Example extends React.Component {
  state = {
    messages: [],socket:null,userId:''
  }


  componentDidMount(){
    
    this.state.socket=io('http://demoauth.chickenkiller.com:5896/');
    this.state.socket.on('connect',()=>{
       console.log('connected socket');
    })
    const {socket}=this.state
    AsyncStorage.getItem(Constants.CURRENT_USER)
    .then(data=>{
        const obj=JSON.parse(data);
        console.log(obj);
        this.setState({userId:obj.userID})
    })

    socket.on('chat_recieved',this.onMessageRecived);

    
    
    

 }
 
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 10,
          text: 'Hello londe',
          createdAt: new Date(),
          user: {
            _id: '5d70f37caa3de02359eba8bc',
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        }
      ],
    })
  }
 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onSendMessage=(Messages=[])=>{
     const { socket }=this.state;
     this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, Messages),
    }))
    socket.emit('sending_chat',Messages);
     
  }

  onMessageRecived=(Messages=[])=>{
    console.log('chat recieved');
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, Messages),
    }))
  }
 
  render() {
      console.log(this.state.userId,"this is current user id");
    // const {socket}=this.state;
    
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSendMessage}
        user={{
          _id: this.state.userId,
        }}
      />
    )
  }
}

export default Example;