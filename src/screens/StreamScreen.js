import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import KSYVideo from "react-native-ksyvideo";
import { streamingURL } from "../config/config";

export default class StreamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      buffering: true
    };
  }

  onProgress() {
    this.setBuffering(false, "");
  }

  onLoad() {
    this.setBuffering(true, "on load");
  }

  onLoadStart() {
    this.setBuffering(true, "on load start");
  }

  onBuffer() {
    this.setBuffering(true, "on buffer");
  }

  setBuffering(buffering = true, text = "") {
    this.setState({ buffering, activity: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Livestream</Text>
        {this.state.activity !== "" ? <Text>{this.state.activity}</Text> : null}
        <ActivityIndicator size="large" color="red" />
        <KSYVideo
          source={{ uri: streamingURL }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          volume={1.0}
          muted={false}
          paused={false} // Pauses playback entirely.
          resizeMode="contain" // Fill the whole screen at aspect ratio.*
          repeat={true} // Repeat forever.
          playInBackground={true} // Audio continues to play when app entering background.
          progressUpdateInterval={250.0} // Interval to fire onProgress (default to ~250ms)
          onLoadStart={() => this.onLoadStart()} // Callback when video starts to load
          onLoad={() => this.onLoad()} // Callback when video loads
          onProgress={() => this.onProgress()} // Callback every ~250ms with currentTime
          //onEnd={this.onEnd} // Callback when playback finishes
          //onError={this.videoError} // Callback when video cannot be loaded
          onBuffer={() => this.onBuffer()} // Callback when remote video is buffering
          style={styles.backgroundVideo}
        />
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
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
