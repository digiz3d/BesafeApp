import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class PictureList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Auth screen</Text>
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
