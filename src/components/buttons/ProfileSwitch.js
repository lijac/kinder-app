import React from "react";
import { View, Text } from "react-native";
import { Switch } from "native-base";

function ProfileSwitch(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <Switch
        trackColor="#000"
        disabled={props.disabled}
        value={props.value}
        onValueChange={v => props.onValueChange(v)}
      />
    </View>
  );
}

const styles = {
  container: {
    height: 36,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5C6979",
    flex: 1
  }
};

export default ProfileSwitch;
