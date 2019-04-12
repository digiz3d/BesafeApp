import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import VideoPlayer from "react-native-video-controls";
import { authHeader } from "../config/WebDavClient";

export default class HelpScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const { getParam } = navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Help</Text>
        <Text>Contact Vision Security : 06 12 34 56 78</Text>
        <Text>Mail : help@vision-security.com</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
