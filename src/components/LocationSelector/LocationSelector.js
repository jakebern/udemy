import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
const locationSelector = () => (
	<View style={styles.container}>
		<View style={styles.placeholder}>
			<Text>Map</Text>
		</View>
		<View style={styles.button}>
			<Button title="Pick Image" onPress={() => alert("Pick Location!")} />
		</View>
	</View>
);

const styles = StyleSheet.create({
	//need this because add a subview.
	//need to take up whole width within flexbox
	container: {
		width: "100%",
		alignItems: "center"
	},
	placeholder: {
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "#eee",
		width: "80%",
		height: 150,
		flex: 1
	},
	button: {
		margin: 8
	}
});

export default locationSelector;
