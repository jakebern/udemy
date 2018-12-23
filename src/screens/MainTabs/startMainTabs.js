import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
	//waits for all promises to resolve before thening
	//need promise because getting icons is async
	//don't want icons to hackily show up
	Promise.all([
		Icon.getImageSource("md-map", 30),
		Icon.getImageSource("ios-share-alt", 30)
	]).then(sources => {
		Navigation.startTabBasedApp({
			tabs: [
				{
					screen: "udemy-react.FindPlaceScreen",
					label: "Find Place",
					title: "Find Place",
					icon: sources[0]
				},
				{
					screen: "udemy-react.SharePlaceScreen",
					label: "Share Place",
					title: "Share Place",
					icon: sources[1]
				}
			]
		});
	});
};

export default startTabs;
