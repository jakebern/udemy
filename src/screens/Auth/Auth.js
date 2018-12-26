import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ImageBackground,
	Dimensions
} from "react-native";
import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/backgroundpic.jpg";
import validate from "../../utility/validation";

class AuthScreen extends Component {
	//need state because want state to listen for dimension changes
	//and for UI to update once dimension changes
	state = {
		viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
		//keep controls in this component vs. redux
		//because state is internal to this component
		controls: {
			email: {
				value: "",
				valid: false,
				validationRules: {
					isEmail: true
				}
			},
			password: {
				value: "",
				valid: false,
				validationRules: {
					minLength: 6
				}
			},
			confirmPassword: {
				value: "",
				valid: false,
				validationRules: {
					equalTo: "password"
				}
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

	updateStyles = dims => {
		this.setState({
			viewMode: dims.window.height > 500 ? "portrait" : "landscape"
		});
	};
	loginHandler = () => {
		startMainTabs();
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
						)
					}
				}
			};
		});
	};
	render() {
		let headingText = null;
		//only show heading text if have lots of vert space
		if (this.state.viewMode === "portrait") {
			headingText = (
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
			);
		}
		return (
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<View style={styles.container}>
					{headingText}
					<ButtonWithBackground color="#29aaf4" onPress={() => alert("hello")}>
						Switch to Login
					</ButtonWithBackground>
					<View style={styles.inputContainer}>
						<DefaultInput
							placeholder="Your Email Address"
							style={styles.input}
							value={this.state.controls.email.value}
							onChangeText={val => this.updateInputState("email", val)}
						/>
						<View
							style={
								this.state.viewMode === "portrait"
									? styles.portraitPasswordContainer
									: styles.landscapePasswordContainer
							}
						>
							<View
								style={
									this.state.viewMode === "portrait"
										? styles.portraitPasswordWrapper
										: styles.landscapePasswordWrapper
								}
							>
								<DefaultInput
									placeholder="Password"
									style={styles.input}
									value={this.state.controls.password.value}
									onChangeText={val => this.updateInputState("password", val)}
								/>
							</View>
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
									onChangeText={val =>
										this.updateInputState("confirmPassword", val)
									}
								/>
							</View>
						</View>
					</View>
					<ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
						Submit
					</ButtonWithBackground>
				</View>
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

export default AuthScreen;
