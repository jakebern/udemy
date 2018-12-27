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
import MapView from "react-native-maps";

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
		console.log(this.props.selectedPlace);
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

				<View style={styles.subContainer}>
					<Image
						style={styles.placeImage}
						source={this.props.selectedPlace.image}
					/>
				</View>

				<View style={styles.subContainer}>
					<MapView
						style={styles.map}
						initialRegion={{
							...this.props.selectedPlace.location,
							latitudeDelta: 0.0122,
							longitudeDelta:
								(Dimensions.get("window").width /
									Dimensions.get("window").height) *
								0.0122
						}}
					>
						<MapView.Marker coordinate={this.props.selectedPlace.location} />
					</MapView>
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
		margin: 30
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
		height: 200,
		width: "100%"
	},
	placeName: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 28
	},
	deleteButton: {
		alignItems: "center"
	},
	map: {
		...StyleSheet.absoluteFillObject
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
