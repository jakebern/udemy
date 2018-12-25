import React, { Component } from "react";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";

const inputBox = props => (
  <DefaultInput
    value={props.placeName}
    onChangeText={props.updateInput}
    placeholder="Place Name"
  />
);

export default inputBox;
