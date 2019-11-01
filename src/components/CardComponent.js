import React, { Component } from 'react';
import { Image } from 'react-native';
import {withNavigation} from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
 class CardImageExample extends Component {


  render() {
    console.log(this.props,"props of card component ")
    return (
      
       <Card >
<CardItem>
  <Left>
    <Thumbnail source={{uri:'https://i.pravatar.cc/100'}} />
    <Body>
      <Text>{this.props.name}</Text>
      <Text note>GeekyAnts</Text>
    </Body>
  </Left>
</CardItem>
<CardItem button={true} onPress={()=>this.props.navigation.navigate('messageSection',{sendersId:this.props.id})} cardBody>
  <Image source={{uri: 'https://i.pravatar.cc'}} style={{height: 200, width: null, flex: 1}}/>
</CardItem>


</Card>  
    );
  }
}


export default withNavigation(CardImageExample)



