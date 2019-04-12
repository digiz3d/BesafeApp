import React, { Component } from "react";
import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import AppNavigator from "./src/config/AppNavigator";

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
