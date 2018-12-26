import React, { Component } from "react";
import { View, Button, StyleSheet, Text, Dimensions } from "react-native";
import MapView from "react-native-maps";

class locationSelector extends Component {
	state = {
		focusedLocation: {
			latitude: 38.6226188,
			longitude: -90.1928209,
			latitudeDelta: 0.0122,
			longitudeDelta:
				(Dimensions.get("window").width / Dimensions.get("window").height) *
				0.0122
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={this.state.focusedLocation}
				/>
				<View style={styles.button}>
					<Button
						title="Pick Location"
						onPress={() => alert("Pick Location!")}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	//need this because add a subview.
	//need to take up whole width within flexbox
	container: {
		width: "100%",
		alignItems: "center"
	},
	map: {
		width: "100%",
		height: 250
	},
	button: {
		margin: 8
	}
});

export default locationSelector;
