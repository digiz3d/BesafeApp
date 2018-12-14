import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { getVideos } from "../config/WebDavClient";

export default class VideoListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    const files = await getVideos();
    this.setState({ items: files });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Videos list</Text>

        {this.state.items.length > 0 && (
          <FlatList
            style={styles.videoList}
            data={this.state.items}
            renderItem={({ item }) => (
              <Text style={styles.videoItem}>{item.filename}</Text>
            )}
            refreshing={false}
            onRefresh={() => console.log("refreshing video list")}
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
  videoItem: {}
});
