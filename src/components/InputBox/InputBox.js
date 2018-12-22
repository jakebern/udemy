import React, {Component} from "react";
import { View, StyleSheet, TextInput, Button} from 'react-native';

export default class inputBox extends Component {
  state = {
    placeName: ''
  }

  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    });
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.props.addPlace(this.state.placeName.trim());
  }

  render() {
    return (
       <View style={styles.inputContainer}>
          <TextInput
            value = {this.state.placeName}
            onChangeText = {this.placeNameChangedHandler}
            placeholder = "An Awesome Place"
            style = {styles.placeInput}
          /> 
          <Button
            title = "Add"
            style = {styles.placeButton}
            onPress = {this.placeSubmitHandler}
           />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});