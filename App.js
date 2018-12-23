import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";

//Register Screens
Navigation.registerComponent("udemy-react.AuthScreen", () => AuthScreen);
Navigation.registerComponent(
  "udemy-react.SharePlaceScreen",
  () => SharePlaceScreen
);
Navigation.registerComponent(
  "udemy-react.FindPlaceScreen",
  () => FindPlaceScreen
);

//Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "udemy-react.AuthScreen",
    title: "Login"
  }
});
