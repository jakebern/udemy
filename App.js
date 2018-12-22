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
import InputBox from './src/components/InputBox/InputBox';
import ListContainer from './src/components/ListContainer/ListContainer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component {
  state = {
    places: []
  }

  updatePlaces = (placeName) => {
    this.setState( (prevState) => {
      return {
        places: prevState.places.concat(placeName)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <InputBox addPlace = {this.updatePlaces}/>
        <ListContainer places = {this.state.places} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //this means container takes whole page
    padding: 30,
    justifyContent: 'flex-start', //start element at beginning of page
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});