import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import PlaceInput from "../../components/InputBox/InputBox";
import { addPlace } from "../../store/actions/index";

class SharePlaceScreen extends Component {
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

	placeAddedHandler = placeName => {
		this.props.onAddPlace(placeName);
	};

	render() {
		return (
			<View>
				<PlaceInput addPlace={this.placeAddedHandler} />
			</View>
		);
	}
}

//receives dispatch function as argument
//returns things can use as props in component
const mapDispatchToProps = dispatch => {
	return {
		//bind something that can use on Props
		onAddPlace: placeName => {
			dispatch(addPlace(placeName));
		}
	};
};

//addPlace is function that takes in place_name
//returns an object
//		type: ADD_PLACE,
//		placeName: placeName
//this object is then passed on reducer
//where reducer performs opps

export default connect(
	null,
	mapDispatchToProps
)(SharePlaceScreen);
