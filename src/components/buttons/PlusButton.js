import React from "react";
import { Text } from "react-native";
import { Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import GradientButton from "react-native-gradient-buttons";

function PlusButton(props) {
 return (

    <GradientButton
      style={{ marginVertical: 8 }}
      text="+"
      textSyle={styles.text}    
      gradientBegin="#ff1049"
      gradientEnd="#ffaf98"
      gradientDirection="horizontal"
      width={props.size?props.size:50}
      height={props.size?props.size:50}
      radius={props.size?props.size/2:25}
      impact="true"
      impactStyle='Light'
      onPressAction={() => !props.busy && props.onPress()}
  />
 );
}

const styles = {
  container: {
    backgroundColor: "#000",
    borderRadius: 3
  },
  text: {
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: "#FFF"
  },
  icon: {
    color: "#FFF",
    fontSize: 25
  }
};

export default PlusButton;
