import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
	<TextInput
		//	will accept all props from class eg. no need to set
		//placeholder={props.placeholder} because will do in parent
		{...props}
		underlineColorAndroid="transparent"
		style={[styles.input, props.styles]} //any styles outside of this file will override
		//second will override the first
	/>
);

const styles = StyleSheet.create({
	input: {
		width: "100%", //can be problematic to use raw pixel values since may not work on small devices.
		borderWidth: 1,
		backgroundColor: "#bbb",
		borderColor: "#eee",
		padding: 5,
		margin: 8
	}
});

export default defaultInput;
