import React from "react";
import { Text } from "react-native";
import { Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import GradientButton from "react-native-gradient-buttons";

function LgButton(props) {
  /*
  return (
    <Button
      full
      style={styles.container}
      ViewComponent={require('expo').LinearGradient}
          linearGradientProps={{
            colors: ['red', 'pink', 'red'],
          }}
      onPress={() => !props.busy && props.onPress()}
    >
        {props.busy === true ? (
          <Feather name="zap" style={styles.icon} />
        ) : (
          <Text style={styles.text}>{props.text}</Text>
        )}
    </Button>
  );
  */
 return (
    <GradientButton
      style={{ marginVertical: 8, marginHorizontal: 0}}
      text={props.text}
      textSyle={styles.text}    
      gradientBegin="#ff1049"
      gradientEnd="#ffaf98"
      gradientDirection="horizontal"
      height={props.height?props.height:44}
      radius={8}
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

export default LgButton;
