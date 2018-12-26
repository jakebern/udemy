import React, { Component } from "react";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";

const inputBox = props => (
	<DefaultInput
		value={props.placeData.value}
		placeholder="Place Name"
		valid={props.placeData.valid}
		touched={props.placeData.touched}
		onChangeText={props.updateInput}
	/>
);

export default inputBox;
