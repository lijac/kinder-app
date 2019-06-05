import React from "react";
import { View, Image, TouchableHighlight } from "react-native";
import { Card, CardItem, Body, Text } from "native-base";

import {BASE_URL} from '../../config/constants';

function ChildrenListItem(props) {
  return (
    <Card>
      <TouchableHighlight onPress={() => props.onPress()} onLongPress={() => props.onLongPress()}>
        <CardItem>
          <Body>
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {props.name}
                </Text>
                <Text numberOfLines={2} style={styles.description}>
                  {props.bandId}
                </Text>
              </View>
              <Image
                source={{uri: `${BASE_URL}${props.pathurl}`}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </Body>
        </CardItem>
      </TouchableHighlight>
    </Card>
  );
}

const IMAGE_DIMENSIONS = 56;

const styles = {
  container: {
    flexDirection: "row"
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#000"
  },
  description: {
    fontFamily: "AvenirMedium",
    fontSize: 12,
    color: "#5F5F5F",
    marginTop: 2
  },
  image: {
    height: IMAGE_DIMENSIONS,
    width: IMAGE_DIMENSIONS,
    marginLeft: 4
  }
};

export default ChildrenListItem;
