import React, { Component } from "react";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";

class inputBox extends Component {
  render() {
    return (
      <DefaultInput
        value={this.props.placeName}
        onChangeText={this.props.updateInput}
        placeholder="Place Name"
      />
    );
  }
}

export default inputBox;
