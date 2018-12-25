import React, { Component } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	ScrollView,
	Image
} from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import imagePlaceholder from "../../assets/image.png";

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
			<ScrollView>
				<View style={styles.container}>
					<MainText>
						<HeadingText>Share a place with us!</HeadingText>
					</MainText>
					<View style={styles.placeholder}>
						<Image source={imagePlaceholder} style={styles.previewImage} />
					</View>
					<View style={styles.button}>
						<Button title="Pick Image" />
					</View>
					<View style={styles.placeholder}>
						<Text>Image Preview</Text>
					</View>
					<View style={styles.button}>
						<Button title="Locate Me" />
					</View>
					<DefaultInput placeholder="Place Name" />
					<View style={styles.button}>
						<Button title="Share the Place!" />
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	placeholder: {
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "#eee",
		width: "80%",
		height: 150
	},
	button: {
		margin: 8
	},
	previewImage: {
		width: "100%",
		height: "100%"
	}
});

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
