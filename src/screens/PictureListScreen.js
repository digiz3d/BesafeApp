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
    console.warn(files);
    let pictures = {};

    console.warn("cc cc");
    try {
      for (let f in files) {
        console.warn("f vaut " + f);
        console.warn("files[f].filename vaut " + files[f].filename);
        pictures[files[f].filename] = "TEST";
        pictures[files[f].filename] = await getPictureBase64(files[f].filename);
      }
    } catch (e) {
      console.warn("ça va pas du tout" + e);
    }
    console.warn("voila voila 1");
    console.warn(pictures);
    console.warn("voila voila 2");

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
              <View key={"view-" + item.filename}>
                {/*<Text>test: {getPictureURL(item.filename)}</Text>*/}
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
