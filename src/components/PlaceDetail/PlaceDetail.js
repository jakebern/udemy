import React from "react";
import { View, Modal, Image, Text, Button, StyleSheet } from "react-native";

const placeDetail = props => {
	return (
		<Modal visible={props.selectedPlace !== null}>
			<View style={styles.modalContainer}>
				<Image
					source={props.selectedPlace ? props.selectedPlace.placeImage : null}
				/>
				<Text>
					{props.selectedPlace ? props.selectedPlace.placeName : null}{" "}
				</Text>
				<View>
					<Button title="Delete" color="red" />
					<Button title="Close" />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		margin: 50
	}
});

//Separately can do something like
//if exists -> modal = N
//
export default placeDetail;
