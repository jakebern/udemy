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
		},
		locationChosen: false
	};

	pickLocationHandler = event => {
		const coords = event.nativeEvent.coordinate;
		this.setState(prevState => {
			return {
				focusedLocation: {
					...prevState.focusedLocation,
					latitude: coords.latitude,
					longitude: coords.longitude
				},
				locationChosen: true
			};
		});
	};

	render() {
		let marker = null;
		if (this.state.locationChosen) {
			marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
		}
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={this.state.focusedLocation}
					region={this.state.focusedLocation}
					onPress={this.pickLocationHandler}
				>
					{marker}
				</MapView>
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
