import React, { Component } from "react";
import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import AppNavigator from "./src/config/AppNavigator";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#d43939" }}>
        <SafeAreaView />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
          <StatusBar />
          <AppNavigator />
        </SafeAreaView>
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
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
