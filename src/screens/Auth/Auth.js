import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput";

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Please Log In</Text>
				<Button title="Switch to Login" />
				<View style={styles.inputContainer}>
					<DefaultInput placeholder="Your Email Address" />
					<DefaultInput placeholder="Password" />
					<DefaultInput placeholder="Confirm Password" />
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
	}
});

export default AuthScreen;
