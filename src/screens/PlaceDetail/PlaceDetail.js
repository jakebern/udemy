import React, { Component } from "react";
import {
	View,
	Image,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";

class placeDetail extends Component {
	placeDeleteHandler = () => {
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop();
	};

	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.placeImage}
					source={this.props.selectedPlace.image}
				/>
				<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
				<View>
					{/* 
						Know you need props here because outer word needs to know
						about if button is pressed.  Thus pass function in via parent
						so parent can know about the press
					*/}
					<TouchableOpacity onPress={this.placeDeleteHandler}>
						<View style={styles.deleteButton}>
							<Icon size={30} name="ios-trash" color="red" />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 50
	},
	placeImage: {
		width: "100%",
		height: 200
	},
	placeName: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 28
	},
	deleteButton: {
		alignItems: "center"
	}
});

//receives dispatch function as argument
//returns things can use as props in component
const mapDispatchToProps = dispatch => {
	return {
		onDeletePlace: key => {
			dispatch(deletePlace(key));
		}
	};
};
export default connect(
	null,
	mapDispatchToProps
)(placeDetail);
