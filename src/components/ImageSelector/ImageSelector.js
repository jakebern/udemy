import React, { Component } from "react";
import { View, Button, StyleSheet, Image } from "react-native";
import ImagePicker from "react-native-image-picker";

class imageSelector extends Component {
	state = {
		pickedImage: null
	};

	pickImageHandler = () => {
		//two args - title for page, response
		//can set noData if not using Base64
		ImagePicker.showImagePicker(
			{ title: "Pick an Image", maxWidth: 800, maxHeight: 600 },
			res => {
				if (res.didCancel) {
					console.log("User canceled!");
				} else if (res.error) {
					console.log("Error");
				} else {
					this.setState({
						pickedImage: {
							uri: res.uri
						}
					});
					this.props.onImagePicked({ uri: res.uri, base64: res.data });
				}
			}
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.placeholder}>
					<Image source={this.state.pickedImage} style={styles.previewImage} />
				</View>
				<View style={styles.button}>
					<Button title="Pick Image" onPress={this.pickImageHandler} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center"
	},
	placeholder: {
		borderWidth: 1,
		borderColor: "black",
		backgroundColor: "#eee",
		width: "80%",
		height: 150
	},
	previewImage: {
		width: "100%",
		height: "100%"
	},
	button: {
		margin: 8
	}
});

export default imageSelector;
