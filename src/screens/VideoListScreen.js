import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import { getVideos, getFileURL, authHeader } from "../config/WebDavClient";

export default class VideoListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.refreshVids = this.refreshVids.bind(this);
  }

  async componentDidMount() {
    await this.refreshVids();
  }

  async refreshVids() {
    const files = await getVideos();
    this.setState({ items: files });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Videos list</Text>

        {this.state.items.length > 0 && (
          <FlatList
            style={styles.videoList}
            data={this.state.items}
            refreshing={false}
            onRefresh={() => this.refreshVids()}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={"view-" + item.filename}
                style={{ flexDirection: "column", padding: 3 }}
                onPress={() =>
                  navigation.navigate("VideoDetails", {
                    url: getFileURL(item.filename)
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                <Image
                    source={require('../assets/video-icon.png')}
                    style={{ height: 60, width: 60 }}
                  />
                  <Text
                    style={[
                      styles.videoItem,
                      { height: 60, lineHeight: 50, fontSize: 16 }
                    ]}
                  >
                    {item.basename}
                  </Text>
                </View>
                <View
                  style={{
                    width: "80%",
                    height: 1,
                    backgroundColor: "#bbb",
                    position: "relative",
                    left: "10%",
                    marginTop: 6
                  }}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  videoList: {
    flex: 1
  },
  videoItem: {
    padding: 10
  }
});
