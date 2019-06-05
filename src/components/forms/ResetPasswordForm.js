import React from "react";
import { View, Text } from "react-native";
import { Form } from "native-base";
import { CheckBox, ThemeProvider } from "react-native-elements";
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton } from "../buttons";
import globalStyles from "../../components/globalStyles";

function ResetPasswordForm(props) {
  let emailError = null;
  if (props.emailError) {
    emailError = (<Text style={globalStyles.errorText}>{props.emailError}</Text>);
  }
  return (
    <Form>
        <UnderlinedInput
          keyboardType="email-address"
          label={Constants.EMAIL}
          value={props.email}
          onChangeText={text => props.onEmailChange(text)}
        />
        {emailError}
        <View style={styles.separator} />

        <LgButton
          text="Reset Password"
          onPress={() => props.onSubmitPress()}
        />
    </Form>
  );
}

const styles = {
  separator: {
    marginTop: 20
  }
};

export default ResetPasswordForm;
