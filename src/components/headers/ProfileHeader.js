import React from "react";
import { View, Image, StatusBar } from "react-native";
import { Header } from "native-base";
import getHeaderContainerStyle from "./getHeaderContainerStyle";

function ProfileHeader(props) {
  return (
    <Header
      noShadow={true}
      style={{
        ...getHeaderContainerStyle(props.nomargin),
        ...styles.container
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <View style={styles.imageContainer}>
        <Image source={props.avatar} style={styles.image} resizeMode="cover" />
      </View>
    </Header>
  );
}

const IMAGE_DIMENSIONS = 100;

const styles = {
  container: {
    height: 120,
    backgroundColor: "#F7F7F7",
    borderBottomColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0
  },
  imageContainer: {
    width: IMAGE_DIMENSIONS,
    height: IMAGE_DIMENSIONS,
    borderRadius: IMAGE_DIMENSIONS / 2,
    overflow: "hidden"
  },
  image: {
    width: IMAGE_DIMENSIONS,
    height: IMAGE_DIMENSIONS
  }
};

export default ProfileHeader;
