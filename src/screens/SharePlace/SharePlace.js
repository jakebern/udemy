import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";
import InputBox from "../../components/InputBox/InputBox";
import MainText from "../../components/UI/MainText/MainText";
import ImageSelector from "../../components/ImageSelector/ImageSelector";
import LocationSelector from "../../components/LocationSelector/LocationSelector";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
	static navigatorStyle = {
		navBarButtonColor: "purple"
	};

	//can either set in constructor as
	//this.state or not.
	state = {
		controls: {
			placeName: {
				value: "", // "test", //"",
				valid: false, //true, //false,
				touched: false,
				validationRules: {
					notEmpty: true //value here doesn't matter
				},
				location: {
					// value: {
					// 	latitude: 38.6226188,
					// 	longitude: -90.1928209
					// },
					value: null,
					valid: false
				}
			}
		}
	};
	constructor(props) {
		super(props);

		//listen to navigation events
		//execute this whenever navigation event occurs
		//since have arrow function, don't need to bind (eg. this.onNavigatorEvent.bind(this))
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}
	placeNameChangedHandler = val => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					placeName: {
						...prevState.controls.placeName,
						value: val,
						valid: validate(val, prevState.controls.placeName.validationRules),
						touched: true
					}
				}
			};
		});
	};

	placeSubmitHandler = () => {
		this.props.onAddPlace(
			this.state.controls.placeName.value,
			this.state.controls.placeName.location
		);
	};

	locationPickedHandler = location => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					placeName: {
						...prevState.controls.placeName,
						location: {
							value: location,
							valid: true //as soon as location received, set to true
						}
					}
				}
			};
		});
	};

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
	render() {
		return (
			<KeyboardAvoidingView behavior={"position"} style={{ flex: 1 }}>
				<ScrollView>
					<View style={styles.container}>
						<MainText>
							<HeadingText>Share a place with us!</HeadingText>
						</MainText>
						<ImageSelector />
						<LocationSelector onLocationPicked={this.locationPickedHandler} />
						<InputBox
							placeData={this.state.controls.placeName}
							updateInput={this.placeNameChangedHandler}
						/>
						<View style={styles.button}>
							<Button
								title="Share the Place!"
								onPress={this.placeSubmitHandler}
								disabled={
									!this.state.controls.placeName.valid ||
									!this.state.controls.placeName.location.valid
								}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
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
		onAddPlace: (placeName, location) => {
			dispatch(addPlace(placeName, location));
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
