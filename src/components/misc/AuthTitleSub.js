import React from "react";
import { View, Text } from "react-native";

function AuthTitleSub(props) {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  );
}

const styles = {
  title: {
    fontFamily: "LatoBlack",
    fontSize: 20,
    color: "#000"
  },
  subtitle: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5F5F5F",
    marginTop: 5
  }
};

export default AuthTitleSub;
