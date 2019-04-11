import React from "react";
import { Image, View, Text } from "react-native";
import VideoPlayer from "react-native-video-controls";
import { authHeader } from "../config/WebDavClient";

export default class VideoDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const { getParam } = navigation;
    return (
      <VideoPlayer
        source={{
          uri: getParam("url"),
          headers: { Authorization: authHeader }
        }}
        navigator={navigation}
        disableVolume
        resizeMode="contain"
        videoStyle={{ height: "100%", width: "100%" }}
        style={{ height: "100%", width: "100%" }}
      />
    );
  }
}
