import React, { Component } from "react";
import { View } from "react-native";

import { connect } from "react-redux";

import ListContainer from "../../components/ListContainer/ListContainer";

class FindPlaceScreen extends Component {
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
