/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//command R to force reload
//command D to enable auto reload

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import InputBox from "./src/components/InputBox/InputBox";
import ListContainer from "./src/components/ListContainer/ListContainer";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
import placeImage from "./src/assets/image.png";

//type Props = {};
export default class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  };

  placeSelectedHandler = key => {
    // this.setState( prevState => {
    //   return {
    //     places: prevState.places.filter( place => {
    //       return place.key!==key;
    //     })
    //   }
    // })
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    });
  };

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random().toString(),
          name: placeName,
          image: placeImage
        })
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.state.selectedPlace} />
        <InputBox addPlace={this.placeAddedHandler} />
        <ListContainer
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //this means container takes whole page
    padding: 30,
    justifyContent: "flex-start", //start element at beginning of page
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
