import React from "react";
import { StyleSheet, View, Platform, SafeAreaView } from "react-native";

// Default URL - change to your machine IP if you want to use a device on the network
const DEFAULT_URL = "http://192.168.0.106:9002";

// Only require react-native-webview on native platforms to avoid web bundling issues.
const NativeWebView =
  Platform.OS === "web" ? null : require("react-native-webview").WebView;

export default function App() {
  const url = DEFAULT_URL;

  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={styles.container}>
        <iframe
          src={url}
          style={styles.iframe}
          title="Rd-GUARD Web"
          sandbox="allow-scripts allow-forms allow-same-origin"
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <NativeWebView
        source={{ uri: url }}
        startInLoadingState
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
  iframe: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
});
