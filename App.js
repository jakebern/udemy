/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 //command R to force reload
 //command D to enable auto reload

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    placeName: '',
    places: []
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === ""){
      return
    }
    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      }
    })
  }

  render() {
    const placesOutput = this.state.places.map(place => (
      <Text>{place}</Text>
    ))
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style = {styles.placeInput}
            value = {this.state.placeName}
            onChangeText = {this.placeNameChangedHandler}
            placeholder = "An Awesome Place"
          /> 
          <Button
            title = "Add"
            style = {styles.placeButton}
            onPress = {this.placeSubmitHandler}
          />
        </View>
        <View>
          {placesOutput}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //this means container takes whole page
    padding: 100,
    justifyContent: 'flex-start', //start element at beginning of page
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputContainer: {
    //flex: 1, // don't need inner container to take full height of page
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
