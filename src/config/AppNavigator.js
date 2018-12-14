import React from "react";
import { View } from "react-native";

import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AuthScreen from "../screens/AuthScreen";
import PictureListScreen from "../screens/PictureListScreen";
import VideoListScreen from "../screens/VideoListScreen";
import StreamScreen from "../screens/StreamScreen";

const MainTabNavigator = createBottomTabNavigator(
  {
    VideoList: {
      screen: VideoListScreen,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-videocam" color="#6CD3DB" size={30} />
      }
    },
    PictureList: {
      screen: PictureListScreen,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-camera" color="#6CD3DB" size={30} />
      }
    },
    LiveStream: {
      screen: StreamScreen,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-play" color="#6CD3DB" size={30} />
      }
    },
    Help: {
      screen: () => <View />,
      navigationOptions: {
        tabBarIcon: <Ionicons name="md-help" color="#6CD3DB" size={30} />
      }
    }
  },
  { tabBarOptions: { showLabel: false } }
);

const MainSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    Main: { screen: MainTabNavigator },
    Auth: { screen: AuthScreen }
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppNavigator = createAppContainer(MainSwitchNavigator);
export default AppNavigator;
