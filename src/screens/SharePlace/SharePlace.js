import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import PlaceInput from "../../components/InputBox/InputBox";
import { addPlace } from "../../store/actions/index";

class SharePlaceScreen extends Component {
	placeAddedHandler = placeName => {
		console.log("placeAddedHandler", placeName);
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

const mapDispatchToProps = dispatch => {
	return {
		onAddPlace: placeName => {
			console.log("onAddPlace", placeName);
			dispatch(addPlace(placeName));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SharePlaceScreen);
