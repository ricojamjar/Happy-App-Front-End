import React from "react";
import { Dimensions } from "react-native";
import LandingScreen from "./src/components/LandingScreen";
import SignInScreen from "./src/components/SignInScreen";
import SignUpScreen from "./src/components/SignUpScreen";
import ForgetPasswordScreen from "./src/components/ForgetPasswordScreen";
import HomeScreen from "./src/components/HomeScreen";
import AllPromoScreen from "./src/components/owner-screens/AllPromoScreen";
import YourPromoScreen from "./src/components/owner-screens/YourPromoScreen";
import ProfileScreen from "./src/components/owner-screens/ProfileScreen";
import NewPromoScreen from "./src/components/owner-screens/NewPromoScreen";
import OwnerLandingScreen from "./src/components/owner-screens/OwnerLandingScreen";
import EditScreen from "./src/components/owner-screens/EditScreen";
import CreateOwnerScreen from "./src/components/owner-screens/CreateOwnerScreen";
import ResetPasswordScreen from "./src/components/owner-screens/ResetPasswordScreen";
import CouponDetailScreen from "./src/components/coupon-screen/CouponDetailScreen";
import MenuDrawer from "./src/components/MenuDrawer";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import Amplify from "@aws-amplify/core";
import config from "./src/aws-exports";

Amplify.configure(config);

const options = {
  tabBarPosition: "bottom",
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  }
};
const AuthTabNavigator = createMaterialTopTabNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        title: `Sign In` // for the header screen
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: `Sign Up` // for the header screen
      })
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: () => ({
        title: `Forget password` // for the header screen
      })
    }
  },
  options
);
const OfferStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Offers list` // for the header screen
      })
    },
    Coupon: {
      screen: CouponDetailScreen,
      navigationOptions: () => ({
        title: `Coupon detail` // for the header screen
      })
    }
  },
  {
    headerMode: "none"
  }
);
const AppDrawerNavigator = createDrawerNavigator(
  {
    Offer: OfferStackNavigator, //define above
    SignIn: {
      screen: AuthTabNavigator, //define above
      navigationOptions: () => ({
        title: `Pub sign in/up` // for the header screen
      })
    }
  },
  options
);
const WIDTH = Dimensions.get("window").width;
const DrawerConfig = {
  drawerWidth: WIDTH * 0.8,
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />;
  }
};
const PromoTabNavigator = createMaterialTopTabNavigator(
  {
    All: {
      screen: AllPromoScreen,
      navigationOptions: () => ({
        title: `all promos now` // for the header screen
      })
    },
    Yours: {
      screen: YourPromoScreen,
      navigationOptions: () => ({
        title: `Your promo` // for the header screen
      })
    }
  },
  options
);
const OwnerDrawerNavigator = createDrawerNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditScreen,
    Promo: HomeScreen,
    NewPromo: NewPromoScreen,
    Reset: ResetPasswordScreen
  },
  DrawerConfig
);
const OwnerSwitchNavigator = createSwitchNavigator({
  OwnerLanding: OwnerLandingScreen,
  OwnerApp: OwnerDrawerNavigator, // the Owner stack
  Register: CreateOwnerScreen // the App stack
});
const AppNavigator = createSwitchNavigator({
  Landing: LandingScreen,
  Owner: OwnerSwitchNavigator, // the Owner stack
  App: AppDrawerNavigator // the App stack
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
