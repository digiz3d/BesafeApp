import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { getPictures } from "../config/WebDavClient";

export default class PictureListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.refreshPictures = this.refreshPictures.bind(this);
  }

  async componentDidMount() {
    await this.refreshPictures();
  }

  async refreshPictures() {
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
            renderItem={({ item }) => (
              <Text style={styles.pictureItem}>{item.filename}</Text>
            )}
            refreshing={false}
            onRefresh={() => this.refreshPictures()}
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
    padding: 10
  }
});
