import React, { Component } from "react";
import { View } from "react-native";

import { connect } from "react-redux";

import ListContainer from "../../components/ListContainer/ListContainer";

class FindPlaceScreen extends Component {
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
		return (
			<View>
				<ListContainer
					places={this.props.places}
					onItemSelected={this.itemSelectedHandler}
				/>
			</View>
		);
	}
}

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
