import React from 'react';
import { StyleSheet,View,Text,Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';




export default class App extends React.Component {
  state = {
    showRealApp: false
  }
  slides = [
    {
      key: 'somethun',
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('../assests/1.jpeg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'somethun-dos',
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../assests/2.jpeg'),
      backgroundColor: '#febe29',
    },
    {
      key: 'somethun1',
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../assests/3.jpeg'),
      backgroundColor: '#22bcb5',
    }
  ];
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image}
        resizeMode={"contain"} />
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
     
      </View>
    );
  };
  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider renderNextButton={this._renderDoneButton} renderItem={this._renderItem} slides={this.slides} onDone={this._onDone}/>;
    }
  }
}
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  text: {
    color: "grey",
    textAlign: "center",
    fontFamily: "IRANSansMobile",
    fontSize: 18
  },
  title: {
    ...Platform.select({
      ios: {
        fontFamily: "IRANSansMobile",
        fontWeight: "bold"
      },
      android: {
        fontFamily: "IRANSansMobile_Bold"
      }
    }),
    fontSize: 22,
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  PB: {
    textAlign: "center",
    color: "black",
    fontFamily: "IRANSansMobile",
    fontSize: 17
  }
});