import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

const startTabs = () => {
	//waits for all promises to resolve before thening
	//need promise because getting icons is async
	//don't want icons to hackily show up
	Promise.all([
		Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
		Icon.getImageSource(
			Platform.OS === "android" ? "md-share-alt" : "ios-share-alt",
			30
		),
		Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
	]).then(sources => {
		Navigation.startTabBasedApp({
			tabs: [
				{
					screen: "udemy-react.FindPlaceScreen",
					label: "Find Place",
					title: "Find Place",
					icon: sources[0],
					navigatorButtons: {
						leftButtons: [
							{
								//button is not automatically added
								//need to add this connection
								icon: sources[2],
								title: "Menu",
								id: "sideDrawerToggle"
							}
						]
					}
				},
				{
					screen: "udemy-react.SharePlaceScreen",
					label: "Share Place",
					title: "Share Place",
					icon: sources[1],
					navigatorButtons: {
						leftButtons: [
							{
								icon: sources[2],
								title: "Menu",
								id: "sideDrawerToggle"
							}
						]
					}
				}
			],
			//but need to add drawer button to each screen
			drawer: {
				left: {
					screen: "udemy-react.SideDrawer"
				}
			}
		});
	});
};

export default startTabs;
