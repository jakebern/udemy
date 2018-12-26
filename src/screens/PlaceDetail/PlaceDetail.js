import React, { Component } from "react";
import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";

class placeDetail extends Component {
	//just good for the initial state
	static navigatorStyle = {
		navBarButtonColor: "purple"
	};
	state = {
		viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener("change", this.updateStyles);
	}

	//remove event listener when compenent is not active
	componentWillUnmount() {
		Dimensions.removeEventListener("change", this.updateStyles);
	}

	updateStyles = dims => {
		this.setState({
			viewMode: dims.window.height > 500 ? "portrait" : "landscape"
		});
	};

	placeDeleteHandler = () => {
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop();
	};

	render() {
		return (
			<View
				style={[
					styles.container,
					this.state.viewMode === "portrait"
						? styles.portraitContainer
						: styles.landscapeContainer
				]}
			>
				{/*split into two high level views
		 because in Lanscape want 2 column view
		 with image on left, text/button on right*/}

				{/*need subcontainer to set equal priority 
	to each subcontainer so that way each takes 50% of 
horizontal space*/}
				<View style={styles.subContainer}>
					<Image
						style={styles.placeImage}
						source={this.props.selectedPlace.image}
					/>
				</View>

				<View style={styles.subContainer}>
					<View>
						<Text style={styles.placeName}>
							{this.props.selectedPlace.name}
						</Text>
					</View>

					<View>
						<TouchableOpacity onPress={this.placeDeleteHandler}>
							<View style={styles.deleteButton}>
								<Icon
									size={30}
									name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
									color="red"
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 50
	},
	subContainer: {
		flex: 1
	},
	portraitContainer: {
		flexDirection: "column"
	},
	landscapeContainer: {
		flexDirection: "row"
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
