import React, { Component } from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

import ListContainer from "../../components/ListContainer/ListContainer";

class FindPlaceScreen extends Component {
	render() {
		return (
			<View>
				<ListContainer places={this.props.places} />
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		places: state.places.places
	};
};

//by running this, get props from redux
//this fills this.props.places
export default connect(mapStateToProps)(FindPlaceScreen);
