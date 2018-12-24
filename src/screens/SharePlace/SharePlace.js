import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import PlaceInput from "../../components/InputBox/InputBox";
import { addPlace } from "../../store/actions/index";

class SharePlaceScreen extends Component {
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
