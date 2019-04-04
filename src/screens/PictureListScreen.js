import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

import {
  getPictures,
  getPictureBase64,
  getPictureURL
} from "../config/WebDavClient";

export default class PictureListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      pictures: []
    };

    this.refreshPictures = this.refreshPictures.bind(this);
  }

  async componentDidMount() {
    await this.refreshPictures();
  }

  async refreshPictures() {
    const files = await getPictures();

    const pictures = [];
    console.warn("cc cc");
    for (let f in files) {
      pictures[f.filename] = await getPictureBase64(f.filename);
    }
    console.warn("voila voila");

    this.setState({ items: files, pictures });
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
              <View>
                <Text>test: {getPictureURL(item.filename)}</Text>
                {this.state.pictures[item.filename] !== "" ? (
                  <Image
                    source={{ uri: this.state.pictures[item.filename] }}
                    style={{ height: 60, width: 60, backgroundColor: "red" }}
                  />
                ) : null}
                <Text style={styles.pictureItem}>{item.filename}</Text>
              </View>
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
