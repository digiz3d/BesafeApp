import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";

import { getPictures } from "../config/WebDavClient";

export default class PictureListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    const files = await getPictures();
    this.setState({ items: files });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Pictures list</Text>

        {this.state.items.length > 0 && (
          <FlatList
            style={styles.pictureList}
            data={this.state.items}
            keyExtractor={item => item.filename}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={item => {
                  console.warn("CLICKEEEED");
                }}
              >
                <Text style={styles.pictureItem}>{item.filename}</Text>
              </TouchableOpacity>
            )}
            refreshing={false}
            onRefresh={() => console.warn("refreshing video list")}
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
  pictureList: {
    flex: 1
  },
  pictureItem: {
    borderWidth: 0.5,
    borderColor: "silver",
    padding: 10
  }
});
