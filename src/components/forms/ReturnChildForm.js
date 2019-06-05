import React from "react";
import { View, Text } from "react-native";
import { Form } from "native-base";
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton } from "../buttons";

function ReturnChildForm(props) {
  return (
    <Form>
      <UnderlinedInput
        keyboardType="numeric"
        label="Wristband ID"
        value={props.wristbandId}
        onChangeText={text => props.onWristbandId(text)}
      />
      <View style={styles.separator} />

      <UnderlinedInput
        label="Phone Number"
        isSecure={true}
        value={props.phoneNumber}
        onChangeText={text => props.onPhoneNumber(text)}
      />
      <View style={styles.separator} />

      <LgButton text="Find Parent" onPress={() => props.onSubmitPress()} />
    </Form>
  );
}

const styles = {
  separator: {
    marginTop: 20
  },
  registerText: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#000",
    flex: 1
  },
  forgotPasswordText: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#000",
    flex: 1,
    textAlign: "right"
  },
  container: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  }
};

export default ReturnChildForm;
