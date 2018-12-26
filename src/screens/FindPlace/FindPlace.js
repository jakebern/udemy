import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	Animated
} from "react-native";

import { connect } from "react-redux";

import ListContainer from "../../components/ListContainer/ListContainer";

class FindPlaceScreen extends Component {
	static navigatorStyle = {
		navBarButtonColor: "purple"
	};

	state = {
		placesLoaded: false,
		removeAnim: new Animated.Value(1), //when remove button
		listIn: new Animated.Value(0) //when add list
	};

	constructor(props) {
		super(props);

		//listen to navigation events
		//execute this whenever navigation event occurs
		//since have arrow function, don't need to bind (eg. this.onNavigatorEvent.bind(this))
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	onNavigatorEvent = event => {
		//willappear, didappear, etc
		//these are independent of componentDidMount
		//better to use these events because sometimes React Navigator
		//will cache React Components
		if (event.type === "NavBarButtonPress") {
			if (event.id === "sideDrawerToggle") {
				//works by default for iOS, not Android
				//See "Using Navigation Events & Toggling Drawer" for Android
				this.props.navigator.toggleDrawer({
					side: "left"
				});
			}
		}
	};

	placesSearchHandler = () => {
		//start animation, switch places placedLoaded to false
		//param 1: value React should change (can safely pass state)
		//param 2: function which you should animate to
		Animated.timing(this.state.removeAnim, {
			toValue: 0, //started at value 1, move to 1
			duration: 500,
			useNativeDriver: true
		}).start(() => {
			//will call this when animation is done
			this.setState({
				placesLoaded: true
			});
			this.placesLoadedHandler();
		});
	};

	//start animation that fades in list
	//value 0 to opacity 1
	placesLoadedHandler = () => {
		Animated.timing(this.state.listIn, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start(); //need to call start
	};

	itemSelectedHandler = key => {
		const selPlace = this.props.places.find(place => {
			return place.key === key;
		});
		this.props.navigator.push({
			screen: "udemy-react.PlaceDetailScreen",
			title: selPlace.name,
			passProps: {
				selectedPlace: selPlace
			}
		});
	};

	render() {
		let content = (
			<Animated.View
				style={{
					//JS object
					opacity: this.state.removeAnim, //reduces opacity
					transform: [
						//make bigger on press
						{
							//if scale is this.state.removeAnim, button would become smaller
							scale: this.state.removeAnim.interpolate({
								inputRange: [0, 1], //0 -> 1 was given input range
								outputRange: [12, 1] //when animation is 0 -> make button size 12
								//when animation is 1 (on start, size should be 1)
							})
						}
					]
				}}
			>
				<TouchableOpacity onPress={this.placesSearchHandler}>
					<View style={styles.searchButton}>
						<Text style={styles.searchButtonText}>Find Places</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		);
		if (this.state.placesLoaded) {
			content = (
				<Animated.View
					style={{
						opacity: this.state.listIn
					}}
				>
					<ListContainer
						places={this.props.places}
						onItemSelected={this.itemSelectedHandler}
					/>
				</Animated.View>
			);
		}
		return (
			<View style={this.state.placesLoaded ? null : styles.buttonContainer}>
				{content}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		justifyContent: "center", //vertical center of page
		alignItems: "center" //horizontal center of page
	},
	searchButton: {
		borderColor: "red",
		borderWidth: 3,
		borderRadius: 50,
		padding: 20
	},
	searchButtonText: {
		color: "red",
		fontWeight: "bold",
		fontSize: 26
	}
});

//receives state, maps to props of components
//get them from global state, which is accessible
//via state.places
const mapStateToProps = state => {
	return {
		places: state.places.places
	};
};

//by running this, get props from redux
//this fills this.props.places
export default connect(mapStateToProps)(FindPlaceScreen);
