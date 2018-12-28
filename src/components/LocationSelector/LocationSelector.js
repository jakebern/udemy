import React, { Component } from "react";
import { View, Button, StyleSheet, Text, Dimensions } from "react-native";
import MapView from "react-native-maps";

class locationSelector extends Component {
	UNSAFE_componentWillMount() {
		this.reset();
	}

	reset = () => {
		this.setState({
			focusedLocation: {
				latitude: 38.6226188,
				longitude: -90.1928209,
				latitudeDelta: 0.0122,
				longitudeDelta:
					(Dimensions.get("window").width / Dimensions.get("window").height) *
					0.0122
			},
			locationChosen: false
		});
	};
	pickLocationHandler = event => {
		const coords = event.nativeEvent.coordinate;
		this.map.animateToRegion({
			...this.state.focusedLocation,
			latitude: coords.latitude,
			longitude: coords.longitude
		});
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
		//pass in js object of form {lat, long}
		this.props.onLocationPicked({
			latitude: coords.latitude,
			longitude: coords.longitude
		});
	};

	getLocationHandler = () => {
		navigator.geolocation.getCurrentPosition(
			pos => {
				//just setting it up this hacky way
				//so can re-use pickLocation Handler
				const coordsEvent = {
					nativeEvent: {
						coordinate: {
							latitude: pos.coords.latitude,
							longitude: pos.coords.longitude
						}
					}
				};
				this.pickLocationHandler(coordsEvent);
			},
			err => {
				console.log(err);
				alert("Fetching the position failed, please pick one manually.");
			}
		);
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
					initialRegion={this.state.focusedLocation} //never re-rendered
					region={this.state.locationChosen ? this.state.focusedLocation : null}
					//don't need to hard code current region in,
					//because animate to it in pick location handler
					onPress={this.pickLocationHandler}
					//to animate, need to get reference to this MapView object
					//to use in JS code. to get reference, use "ref" feature

					//binds property of class to reference
					//takes in argument (reference), sets this.map to reference
					//can use this.map outside of this area
					ref={reference => (this.map = reference)}
				>
					{marker}
				</MapView>
				<View style={styles.button}>
					<Button title="Pick Location" onPress={this.getLocationHandler} />
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
