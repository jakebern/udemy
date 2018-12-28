import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { addPlace, startAddPlace } from "../../store/actions/index";
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

	constructor(props) {
		super(props);

		//listen to navigation events
		//execute this whenever navigation event occurs
		//since have arrow function, don't need to bind (eg. this.onNavigatorEvent.bind(this))
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	UNSAFE_componentWillMount() {
		this.reset(); //establishes initial state
	}

	componentDidUpdate() {
		if (this.props.placeAdded) {
			this.props.navigator.switchToTab({ tabIndex: 0 });
		}
	}

	reset = () => {
		this.setState({
			controls: {
				placeName: {
					value: "", // "test", //"",
					valid: false, //true, //false,
					touched: false,
					validationRules: {
						notEmpty: true //value here doesn't matter
					}
				},
				location: {
					// value: {
					// 	latitude: 38.6226188,
					// 	longitude: -90.1928209
					// },
					value: null,
					valid: false
				},

				image: {
					value: null,
					valid: false
				}
			}
		});
	};

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
			this.state.controls.location.value,
			this.state.controls.image.value
		);
		this.reset();
		this.image.reset();
		this.map.reset();
	};

	locationPickedHandler = location => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					location: {
						value: location,
						valid: true //as soon as location received, set to true
					}
				}
			};
		});
	};

	imagePickedHandler = image => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					image: {
						value: image,
						valid: true
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
		if (event.type === "ScreenChangedEvent") {
			if (event.id === "willAppear") {
				this.props.onStartAddPlace();
			}
		}

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
		let submitButton = (
			<Button
				title="Share the Place!"
				onPress={this.placeSubmitHandler}
				disabled={
					!this.state.controls.placeName.valid ||
					!this.state.controls.location.valid ||
					!this.state.controls.image.valid
				}
			/>
		);

		if (this.props.isLoading) {
			submitButton = <ActivityIndicator />;
		}

		return (
			<KeyboardAvoidingView behavior={"position"} style={{ flex: 1 }}>
				<ScrollView>
					<View style={styles.container}>
						<MainText>
							<HeadingText>Share a place with us!</HeadingText>
						</MainText>
						<ImageSelector
							onImagePicked={this.imagePickedHandler}
							ref={reference => (this.image = reference)}
						/>
						<LocationSelector
							onLocationPicked={this.locationPickedHandler}
							ref={reference => (this.map = reference)}
						/>
						<InputBox
							placeData={this.state.controls.placeName}
							updateInput={this.placeNameChangedHandler}
						/>
						<View style={styles.button}>{submitButton}</View>
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

//need this to access global state
const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading,
		placeAdded: state.places.placeAdded
	};
};
//receives dispatch function as argument
//returns things can use as props in component
const mapDispatchToProps = dispatch => {
	return {
		//bind something that can use on Props
		onStartAddPlace: () => dispatch(startAddPlace()),
		onAddPlace: (placeName, location, image) => {
			dispatch(addPlace(placeName, location, image));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SharePlaceScreen);
