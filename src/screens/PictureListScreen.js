import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import { getPictures, getFileURL, authHeader } from "../config/WebDavClient";

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
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Pictures list</Text>

        {this.state.items.length > 0 && (
          <FlatList
            style={styles.pictureList}
            data={this.state.items}
            refreshing={false}
            onRefresh={() => this.refreshPictures()}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={"view-" + item.filename}
                style={{ flexDirection: "column", padding: 3 }}
                onPress={() =>
                  navigation.navigate("PictureDetails", {
                    url: getFileURL(item.filename)
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                <Image
                    source={{
                      uri: getFileURL(item.filename),
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
  pictureList: {
    flex: 1
  },
  pictureItem: {
    padding: 10
  }
});
