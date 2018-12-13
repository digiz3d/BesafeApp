import React from "react";
import { StyleSheet, Text, View } from "react-native";
import KSYVideo from "react-native-ksyvideo";

export default class StreamScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Video player</Text>
        <KSYVideo
          source={{ uri: "rtmp://10.92.4.75/live" }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          volume={1.0}
          muted={false}
          paused={false} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.*
          repeat={true} // Repeat forever.
          playInBackground={false} // Audio continues to play when app entering background.
          progressUpdateInterval={250.0} // Interval to fire onProgress (default to ~250ms)
          onLoadStart={this.loadStart} // Callback when video starts to load
          onLoad={this.setDuration} // Callback when video loads
          onProgress={this.setTime} // Callback every ~250ms with currentTime
          onEnd={this.onEnd} // Callback when playback finishes
          onError={this.videoError} // Callback when video cannot be loaded
          onBuffer={this.onBuffer} // Callback when remote video is buffering
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
