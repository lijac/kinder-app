import React from "react";
import { View, Text } from "react-native";
import { Form } from "native-base";
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton } from "../buttons";

function LoginForm(props) {
  return (
    <Form>
      <UnderlinedInput
        keyboardType="email-address"
        label={Constants.EMAIL}
        value={props.email}
        onChangeText={text => props.onEmailChange(text)}
      />
      <View style={styles.separator} />

      <UnderlinedInput
        label={Constants.PASSWORD}
        isSecure={true}
        value={props.password}
        onChangeText={text => props.onPasswordChange(text)}
      />
      <View style={styles.separator} />

      <LgButton text={Constants.LOGIN} onPress={() => props.onSubmitPress()} />

      <View style={styles.container}>
        <Text
          style={styles.registerText}
          onPress={() => props.onCreateAccountPress()}
        >
          {Constants.REGISTER_TEXT}
        </Text>
        <Text style={styles.forgotPasswordText} onPress={() => props.onForgetPasswordPress()}>{Constants.FORGOT_PASSWORD}</Text>
      </View>
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

export default LoginForm;
