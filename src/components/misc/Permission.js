import React from "react";
import { View, Image, Text } from "react-native";
import { LgButton } from "../buttons";
import { Constants } from "../../config";

function Permission(props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={props.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.center}>
        {!!props.title && <Text style={styles.title}>{props.title}</Text>}
        <Text style={styles.description}>{props.description}</Text>
      </View>

      <View style={styles.bottom}>
        <LgButton text={props.allowText} onPress={() => props.onAllowPress()} />
        <Text style={styles.denyText}>{Constants.DO_NOT_ALLOW}</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1
  },
  top: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 1
  },
  center: {
    justifyContent: "center"
  },
  title: {
    fontFamily: "LatoBlack",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginTop: 10
  },
  description: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5F5F5F",
    textAlign: "center",
    marginTop: 10
  },
  bottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  denyText: {
    fontFamily: "AvenirMedium",
    fontSize: 12,
    color: "#5F5F5F",
    textAlign: "center",
    marginTop: 10
  }
};

export default Permission;
