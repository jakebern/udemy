import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/backgroundpic.jpg";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignIn } from "../../store/actions/index";

class AuthScreen extends Component {
	//need state because want state to listen for dimension changes
	//and for UI to update once dimension changes
	state = {
		viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
		authMode: "login",
		//keep controls in this component vs. redux
		//because state is internal to this component
		controls: {
			email: {
				value: "",
				valid: false,
				validationRules: {
					isEmail: true
				},
				touched: false
			},
			password: {
				value: "",
				valid: true, //false,
				validationRules: {
					minLength: 6
				},
				touched: false
			},
			confirmPassword: {
				value: "",
				valid: false,
				validationRules: {
					equalTo: "password"
				},
				touched: false
			}
		}
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener("change", this.updateStyles);
	}

	//remove event listener when compenent is not active
	componentWillUnmount() {
		Dimensions.removeEventListener("change", this.updateStyles);
	}

	//will not be executed if close app, and reopen without killing
	//will be executed on app relaunch.
	componentDidMount() {
		this.props.onAutoSignIn();
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === "login" ? "signup" : "login"
			};
		});
	};

	updateStyles = dims => {
		this.setState({
			viewMode: dims.window.height > 500 ? "portrait" : "landscape"
		});
	};
	authHandler = () => {
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value
		};
		this.props.onTryAuth(authData, this.state.authMode);
	};

	updateInputState = (key, value) => {
		this.setState(prevState => {
			let connectedValue = {};

			//if the equalTo rule exists
			if (this.state.controls[key].validationRules.equalTo) {
				//in our case, equalControl = password
				const equalControl = this.state.controls[key].validationRules.equalTo;
				const equalValue = this.state.controls[equalControl].value;
				connectedValue = {
					...connectedValue,
					equalTo: equalValue
				};
			}
			if (key === "password") {
				connectedValue = {
					...connectedValue,
					equalTo: value
				};
			}

			return {
				controls: {
					...prevState.controls,

					//need to check confirmPassword is correct
					//when Password updates as well
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid:
							key === "password"
								? validate(
										prevState.controls.confirmPassword.value,
										prevState.controls.confirmPassword.validationRules,
										connectedValue
								  )
								: prevState.controls.confirmPassword.valid
					},
					[key]: {
						//dynamic access of key
						...prevState.controls[key],
						value: value,
						valid: validate(
							value,
							prevState.controls[key].validationRules,
							connectedValue
						),
						touched: true
					}
				}
			};
		});
	};
	render() {
		let headingText = null;
		let confirmPasswordControl = null;
		let submitButton = (
			<ButtonWithBackground
				color="#29aaf4"
				onPress={this.authHandler}
				disabled={
					(!this.state.controls.confirmPassword.valid &&
						this.state.authMode === "signup") ||
					!this.state.controls.email.valid ||
					!this.state.controls.password.valid
				}
			>
				Submit
			</ButtonWithBackground>
		);
		//only show heading text if have lots of vert space
		if (this.state.viewMode === "portrait") {
			headingText = (
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
			);
		}
		if (this.state.authMode === "signup") {
			confirmPasswordControl = (
				<View
					style={
						this.state.viewMode === "portrait"
							? styles.portraitPasswordWrapper
							: styles.landscapePasswordWrapper
					}
				>
					<DefaultInput
						placeholder="Confirm Password"
						style={styles.input}
						value={this.state.controls.confirmPassword.value}
						onChangeText={val => this.updateInputState("confirmPassword", val)}
						valid={this.state.controls.confirmPassword.valid}
						touched={this.state.controls.confirmPassword.touched}
						secureTextEntry
					/>
				</View>
			);
		}
		if (this.props.isLoading) {
			submitButton = <ActivityIndicator />;
		}
		return (
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<KeyboardAvoidingView style={styles.container} behavior="padding">
					{headingText}
					<ButtonWithBackground
						color="#29aaf4"
						onPress={this.switchAuthModeHandler}
					>
						Switch to {this.state.authMode === "login" ? "Sign Up!" : "Login"}
					</ButtonWithBackground>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.inputContainer}>
							<DefaultInput
								placeholder="Your Email Address"
								style={styles.input}
								value={this.state.controls.email.value}
								onChangeText={val => this.updateInputState("email", val)}
								valid={this.state.controls.email.valid}
								touched={this.state.controls.email.touched}
								//all below are provided by React Native Text
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="email-address"
							/>
							<View
								style={
									this.state.viewMode === "portrait" ||
									this.state.authMode === "login"
										? styles.portraitPasswordContainer
										: styles.landscapePasswordContainer
								}
							>
								<View
									style={
										this.state.viewMode === "portrait" ||
										this.state.authMode === "login"
											? styles.portraitPasswordWrapper
											: styles.landscapePasswordWrapper
									}
								>
									<DefaultInput
										placeholder="Password"
										style={styles.input}
										value={this.state.controls.password.value}
										onChangeText={val => this.updateInputState("password", val)}
										valid={this.state.controls.password.valid}
										touched={this.state.controls.password.touched}
										secureTextEntry
									/>
								</View>
								{confirmPasswordControl}
							</View>
						</View>
					</TouchableWithoutFeedback>
					{submitButton}
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	//flex 1 will take entire space based on priority
	//with no sibling, will take all space
	//always set flex 1 if won't to position for full page
	container: {
		flex: 1,
		justifyContent: "center", //vertical centering
		alignItems: "center" //horizontal centering
	},
	backgroundImage: {
		width: "100%",
		flex: 1
	},
	inputContainer: {
		width: "80%"
	},
	input: {
		backgroundColor: "#eee",
		borderColor: "#bbb"
	},
	landscapePasswordContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	portraitPasswordContainer: {
		flexDirection: "column",
		justifyContent: "flex-start" //give elements between
	},
	landscapePasswordWrapper: {
		width: "45%"
	},
	portraitPasswordWrapper: {
		width: "100%"
	}
});

//makes aware of things in reducer
const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAutoSignIn: () => dispatch(authAutoSignIn()),
		onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthScreen);
