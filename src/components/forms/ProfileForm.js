import React from "react";
import { View, Text } from "react-native";
import { Form } from "native-base";
import PhoneInput from "react-native-phone-input";
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton, ProfileSwitch } from "../buttons";
import globalStyles from "../globalStyles";

function ProfileForm(props) {

  let nameError = null, emailError = null, passwordError = null, mobileNumberError = null;
  if (props.nameError) {
    nameError = (<Text style={globalStyles.errorText}>{props.nameError}</Text>);
  }
  if (props.emailError) {
    emailError = (<Text style={globalStyles.errorText}>{props.emailError}</Text>);
  }
  if (props.passwordError) {
    passwordError = (<Text style={globalStyles.errorText}>{props.passwordError}</Text>);
  }
  if (props.mobileNumberError) {
    mobileNumberError = (<Text style={globalStyles.errorText}>{props.mobileNumberError}</Text>);
  }

  return (
    <Form>
        <UnderlinedInput
          label={Constants.FULL_NAME}
          value={props.name}
          onChangeText={text => props.onNameChange(text)}
        />
        {nameError}
        <View style={styles.separator} />
        <UnderlinedInput
          keyboardType="email-address"
          label={Constants.EMAIL}
          value={props.email}
          onChangeText={text => props.onEmailChange(text)}
        />
        {emailError}
        <View style={styles.separator} />

        <UnderlinedInput
          label="Password (******)"
          isSecure={true}
          value={props.password}
          onChangeText={text => props.onPasswordChange(text)}
        />
        {passwordError}
        <View style={styles.separator} />

        <PhoneInput
          initialCountry="no"
          label="Mobile Number"
          value={props.mobileNumber}
          textComponent={UnderlinedInput}
          textStyle={{borderBottomColor: 'black', borderBottomWidth: 1}}
          flagStyle={{marginTop: 25}}
          textProps={{label: 'Mobile Number'}}
          onChangePhoneNumber={(number) => props.onMobileNumberChange(number)}
        />
        {mobileNumberError}
        <View style={styles.separator} />

        <PhoneInput
          initialCountry="no"
          value={props.sms1}
          textComponent={UnderlinedInput}
          textStyle={{borderBottomColor: 'black', borderBottomWidth: 1}}
          flagStyle={{marginTop: 25}}
          textProps={{label: 'Guardian SMS 1'}}
          onChangePhoneNumber={(number) => props.onSms1Change(number)}
        />
        <View style={styles.separator} />

        <PhoneInput
          initialCountry="no"
          value={props.sms2}
          textComponent={UnderlinedInput}
          textStyle={{borderBottomColor: 'black', borderBottomWidth: 1}}
          flagStyle={{marginTop: 25}}
          textProps={{label: 'Guardian SMS 2'}}
          onChangePhoneNumber={(number) => props.onSms2Change(number)}
        />
        <View style={styles.separator} />

        <LgButton
          text="Update"
          onPress={() => props.onSubmitPress()}
        />
        <View style={{ margin: 10, textAlign: 'center' }}>
          <Text style={styles.logoutText} onPress={() => props.onSignOutPress()}>
            Sign Out
          </Text>
        </View>
    </Form>
  );
}

const styles = {
  separator: {
    marginTop: 20
  },
  submitButtonContainer: {
    alignSelf: "center",
    marginBottom: 20
  }, 
  logoutText: {
    alignSelf: "center"
  }
};

export default ProfileForm;
