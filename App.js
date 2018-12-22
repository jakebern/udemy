import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import InputBox from "./src/components/InputBox/InputBox";
import ListContainer from "./src/components/ListContainer/ListContainer";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";
//import placeImage from "./src/assets/image.png";
import {
  addPlace,
  deletePlace,
  selectPlace,
  deselectPlace
} from "./src/store/actions/index";

//type Props = {};
class App extends Component {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  };

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  };
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <InputBox addPlace={this.placeAddedHandler} />
        <ListContainer
          places={this.props.places}
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

const mapStateToProps = state => {
  return {
    places: state.places.places, // reason state.places is using specific places Reducer.
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};
//connect function returns a function, which will pass App
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
