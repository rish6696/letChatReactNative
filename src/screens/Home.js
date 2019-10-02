import React from 'react'
import {View,Text,Button} from 'react-native'

import {connect} from 'react-redux';
import Actions from '../actions/index';
//import NaviagtionService from '../services/NavigationService'
class Home extends React.Component { 
    
    logout=async ()=>{
          this.props.googleSignOut(this.props.navigation);
    }
    render(){
        return(
            <View>
                <Text>This is the home screen</Text>
                <Button title='logout' onPress={this.logout}></Button>
            </View>
        )
    }
         
}

const mapActionToProps={
    googleSignOut:Actions.googleSignOut
}

const mapStateToProps=(state)=>{
    return state;
}
export default connect(mapStateToProps,mapActionToProps)(Home)