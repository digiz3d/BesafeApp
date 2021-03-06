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
import PictureDetailsScreen from "../screens/PictureDetailsScreen";
import VideoListScreen from "../screens/VideoListScreen";
import VideoDetailsScreen from "../screens/VideoDetailsScreen";
import StreamScreen from "../screens/StreamScreen";
import HelpScreen from "../screens/HelpScreen";

const VideoStackNavigator = createStackNavigator(
  {
    VideoList: {
      screen: VideoListScreen
    },
    VideoDetails: {
      screen: VideoDetailsScreen
    }
  },
  { headerMode: "none" }
);

const PictureStackNavigator = createStackNavigator(
  {
    PictureList: {
      screen: PictureListScreen
    },
    PictureDetails: {
      screen: PictureDetailsScreen
    }
  },
  { headerMode: "none" }
);

const MainTabNavigator = createBottomTabNavigator(
  {
    VideoStack: {
      screen: VideoStackNavigator,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-videocam" color="#6CD3DB" size={30} />
      }
    },
    PictureStack: {
      screen: PictureStackNavigator,
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
      screen: HelpScreen,
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
