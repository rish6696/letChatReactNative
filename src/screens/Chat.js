import React, { Component } from 'react';
import { Image,FlatList,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import CardComponent from '../components/CardComponent';
import action from '../actions/index'
class CardImageExample extends Component {

  state={
    dataRecieved:false,pageNo:1
  }

  renderCard=({item})=>{
      return (
        <CardComponent  name={item.name} ></CardComponent>
      )
  }
  componentWillReceiveProps(){
    console.log('compoenent will recieve props')
  }
  componentDidMount(){
       this.props.connectSocket();
       this.props.fetchUsers(1);
      
  }

  render() {
    console.log(this.props,"these are the props")
    if(this.props.users!==null&&this.props.users.status){
      return(
        <Container>
        <Header />
        <Content>
          <FlatList
          renderItem={this.renderCard}
          data={this.props.users.users}
          keyExtractor={(x)=>x._id}
          />
        </Content>
      </Container>
      )
    }else{
      return(
        <ActivityIndicator></ActivityIndicator>
      )
    }
  }
}

const mapStateToProps=(state)=>{
  return {
    users:state.fetchUsers
  }
}

const mapActionsToProps={
  fetchUsers:action.fetchUsers,
  connectSocket:action.connectSocket
}

export default connect(mapStateToProps,mapActionsToProps)(CardImageExample)




// componentDidMount(){
//     console.log('runnned')
//     const socket=io('http://192.168.0.103:5896/');
//     socket.on('connect',()=>{
//         console.log(socket.id);
//     })
// }

//https://i.pravatar.cc/150