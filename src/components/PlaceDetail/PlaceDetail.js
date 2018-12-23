import React from "react";
import {
	View,
	Modal,
	Image,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
					<TouchableOpacity onPress={props.onItemDeleted}>
						<View style={styles.deleteButton}>
							<Icon size={30} name="ios-trash" color="red" />
						</View>
					</TouchableOpacity>
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
	},
	deleteButton: {
		alignItems: "center"
	}
});

//Separately can do something like
//if exists -> modal = N
//
export default placeDetail;
