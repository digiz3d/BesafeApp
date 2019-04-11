import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import {
  getPictures,
  getPictureBase64,
  getPictureURL,
  authHeader
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
        console.warn("files[f].filename vaut " + files[f].filename);
        pictures[files[f].filename] = files[f].filename;
      }
    } catch (e) {
      console.warn("ça va pas du tout" + e);
    }
    this.setState({ items: files, pictures });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Pictures list</Text>

        {this.state.items.length > 0 && (
          <FlatList
            style={styles.pictureList}
            data={this.state.items}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={"view-" + item.filename}
                style={{ flexDirection: "column", padding: 3 }}
                onPress={() =>
                  navigation.navigate("PictureDetails", {
                    url: getPictureURL(item.filename)
                  })
                }
              >
                {/*<Text>test: {getPictureURL(item.filename)}</Text>*/}
                {this.state.pictures[item.filename] !== "" ? (
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{
                        uri: getPictureURL(item.filename),
                        headers: { Authorization: authHeader }
                      }}
                      style={{ height: 60, width: 60 }}
                    />
                    <Text
                      style={[
                        styles.pictureItem,
                        { height: 60, lineHeight: 50, fontSize: 16 }
                      ]}
                    >
                      {item.basename}
                    </Text>
                  </View>
                ) : null}

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
