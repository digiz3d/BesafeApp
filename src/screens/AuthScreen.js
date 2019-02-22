import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

import { setLoginPassword } from "../config/WebDavClient";

export default class PictureList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: "",
      passwordValue: ""
    };

    this.loginChanged = this.loginChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  loginChanged(newLogin) {
    this.setState({ loginValue: newLogin });
  }

  passwordChanged(newPassword) {
    this.setState({ passwordValue: newPassword });
  }

  async logIn() {
    const res = await setLoginPassword(
      this.state.loginValue,
      this.state.passwordValue
    );
    
    if (res) {
      this.props.navigation.navigate('Main');
    }
  }
  render() {
    const inputDisabled =
      this.state.loginValue.trim() === "" ||
      this.state.passwordValue.trim() === "";

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Auth screen</Text>
        <TextInput
          keyboardType="default"
          value={this.state.loginValue}
          onChangeText={this.loginChanged}
          style={styles.input}
        />
        <TextInput
          keyboardType="default"
          value={this.state.passwordValue}
          secureTextEntry
          onChangeText={this.passwordChanged}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.logIn}
          style={[styles.button, { opacity: inputDisabled ? 0.5 : 1 }]}
          disabled={inputDisabled}
        >
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
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
    backgroundColor: "#F5FCFF",
    padding: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  input: {
    backgroundColor: "white",
    borderColor: "silver",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    height: 50,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "black",
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    borderWidth: 1
  },
  buttonText: {
    lineHeight: 50,
    textAlign: "center",
    color: "white",
    fontSize: 16
  }
});
