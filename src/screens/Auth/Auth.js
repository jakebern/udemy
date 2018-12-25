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

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		let headingText = null;
		//only show heading text if have lots of vert space
		if (Dimensions.get("window").height > 500) {
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
						/>
						<View style={styles.passwordContainer}>
							<View style={styles.passwordWrapper}>
								<DefaultInput placeholder="Password" style={styles.input} />
							</View>
							<View style={styles.passwordWrapper}>
								<DefaultInput
									placeholder="Confirm Password"
									style={styles.input}
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
	passwordContainer: {
		flexDirection: Dimensions.get("window").height > 500 ? "column" : "row",
		justifyContent: "space-between" //give elements between
	},
	passwordWrapper: {
		width: Dimensions.get("window").height > 500 ? "100%" : "45%"
	}
});

export default AuthScreen;
