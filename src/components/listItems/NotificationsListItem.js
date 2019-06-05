import React from "react";
import { View, Image } from "react-native";
import { Card, CardItem, Body, Text } from "native-base";

function NotificationsListItem(props) {
  return (
    <Card>
      <CardItem>
        <Body>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {props.title}
              </Text>
              <Text numberOfLines={2} style={styles.description}>
                {props.description}
              </Text>
            </View>
            <Image
              source={props.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </Body>
      </CardItem>
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

export default NotificationsListItem;
