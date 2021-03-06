import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";

const store = configureStore();

//Register Screens
//pass in redox - store, Provider --> if needs global state
Navigation.registerComponent(
  "udemy-react.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "udemy-react.SharePlaceScreen",
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "udemy-react.FindPlaceScreen",
  () => FindPlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "udemy-react.PlaceDetailScreen",
  () => PlaceDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "udemy-react.SideDrawer",
  () => SideDrawer,
  store,
  Provider
);

//Start a App
//exporting so can call this on logout
export default () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: "udemy-react.AuthScreen",
      title: "Login"
    }
  });
