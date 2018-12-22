import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ListItem from "../ListItem/ListItem";

const listContainer = props => {
	return (
		<FlatList
			style={styles.listContainer}
			data={props.places} //data source, must be array
			//should return JSX, but then need to give each object
			//a key -> add to datastore
			renderItem={info => (
				<ListItem
					placeName={info.item.name}
					placeImage={info.item.image}
					onItemPressed={() => props.onItemSelected(info.item.key)}
				/>
			)}
		/>
	);
};
const styles = StyleSheet.create({
	listContainer: {
		width: "100%"
	}
});
export default listContainer;
