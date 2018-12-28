import React, { Component } from "react";
import { connect } from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Button,
	TouchableOpacity,
	Platform
} from "react-native";
import { logout } from "../../store/actions/index";

import Icon from "react-native-vector-icons/Ionicons";

class SideDrawer extends Component {
	render() {
		return (
			<View
				style={[
					styles.container,
					{ width: Dimensions.get("window").width * 0.8 }
				]}
			>
				<TouchableOpacity onPress={this.props.onLogout}>
					<View style={styles.drawerItem}>
						<Icon
							size={30}
							name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
							color="#aaa"
							style={styles.drawerItemIcon}
						/>
						<Text>Sign Out</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 55,
		backgroundColor: "white",
		flex: 1
	},
	drawerItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#eee"
	},
	drawerItemIcon: {
		marginRight: 15
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(logout())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SideDrawer);
