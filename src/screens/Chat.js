import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
export default class ListAvatarExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem onPress={()=>{this.props.navigation.navigate('messageSection')}} avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://i.pravatar.cc/150' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}


// componentDidMount(){
//     console.log('runnned')
//     const socket=io('http://192.168.0.103:5896/');
//     socket.on('connect',()=>{
//         console.log(socket.id);
//     })
// }