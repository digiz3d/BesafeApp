import React from "react";
import { Image, View, Text } from "react-native";
import { authHeader } from "../config/WebDavClient";

export default class PictureDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getParam } = this.props.navigation;
    return (
      <View>
        {/*<Text>url = {getParam("url")}</Text>*/}
        <Image
          source={{
            uri: getParam("url"),
            headers: { Authorization: authHeader }
          }}
          resizeMode='contain'
          style={{ height: '100%', width: '100%' }}
        />
      </View>
    );
  }
}
