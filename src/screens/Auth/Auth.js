import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		return (
			<View style={styles.container}>
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
				<Button title="Switch to Login" />
				<View style={styles.inputContainer}>
					<DefaultInput placeholder="Your Email Address" style={styles.input} />
					<DefaultInput placeholder="Password" style={styles.input} />
					<DefaultInput placeholder="Confirm Password" style={styles.input} />
				</View>
				<Button
					title="Submit"
					onPress={this.loginHandler}
					style={styles.input}
				/>
			</View>
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
	inputContainer: {
		width: "80%"
	},
	input: {
		backgroundColor: "#eee",
		borderColor: "#bbb"
	}
});

export default AuthScreen;
