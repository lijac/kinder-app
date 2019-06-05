import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet
} from "react-native";

function RentalItem(props) {
  return (
    <TouchableHighlight
      style={
        props.spaced
          ? { ...styles.container, ...styles.containerSpacing }
          : styles.container
      }
      onPress={() => props.onPress()}
      underlayColor="#EFF1F5"
    >
      <View>
        <View style={styles.imageContainer}>
          <Image source={props.image} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.price}>{props.price}</Text>
          <Text numberOfLines={2} style={styles.title}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const IMAGE_HEIGHT = 150;
const CONTAINER_WIDTH = 170;

const styles = {
  container: {
    width: CONTAINER_WIDTH,
    borderColor: "#F7F7F7",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 10
  },
  containerSpacing: {
    marginRight: 15,
    marginTop: 5
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  textContainer: {
    padding: 8
  },
  image: {
    height: IMAGE_HEIGHT,
    width: CONTAINER_WIDTH
  },
  price: {
    fontFamily: "LatoBlack",
    fontSize: 20,
    color: "#000"
  },
  title: {
    fontFamily: "AvenirMedium",
    fontSize: 13,
    color: "#5F5F5F",
    marginTop: 5
  }
};

export default RentalItem;
