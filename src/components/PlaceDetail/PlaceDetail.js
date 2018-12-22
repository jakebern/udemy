import React from "react";
import { View, Modal, Image, Text, Button, StyleSheet } from "react-native";

const placeDetail = props => {
	return (
		<Modal visible={props.selectedPlace !== null} animationType="slide">
			<View style={styles.modalContainer}>
				<Image
					style={styles.placeImage}
					source={props.selectedPlace ? props.selectedPlace.image : null}
				/>
				<Text style={styles.placeImage}>
					{props.selectedPlace ? props.selectedPlace.name : null}
				</Text>
				<View>
					{/* 
						Know you need props here because outer word needs to know
						about if button is pressed.  Thus pass function in via parent
						so parent can know about the press
					*/}
					<Button title="Delete" color="red" onPress={props.onItemDeleted} />
					<Button title="Close" onPress={props.onModalClosed} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		margin: 50
	},
	placeImage: {
		height: 30,
		width: 30
	},
	placeName: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 28
	}
});

//Separately can do something like
//if exists -> modal = N
//
export default placeDetail;
