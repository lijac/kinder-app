import React from "react";
import { View, Text } from "react-native";
import { Form } from "native-base";
import { CheckBox, ThemeProvider } from "react-native-elements";
import PhoneInput from "react-native-phone-input";
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton } from "../buttons";
import globalStyles from "../globalStyles";

function RegisterForm(props) {
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
  
  const agreeTitle = (
  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5}}>
    <Text style={styles.descText}>I agree to the KinderID </Text>
    <Text style={styles.linkText} onPress={() => props.onClickTerms()}>Terms &amp; Conditions</Text>
    <Text style={styles.descText}> and </Text>
    <Text style={styles.linkText} onPress={() => props.onClickPrivacy()}>Privacy Policy</Text>
  </View>
  )
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

        <PhoneInput
          initialCountry="no"
          label="Mobile Number"
          textComponent={UnderlinedInput}
          textStyle={{borderBottomColor: 'black', borderBottomWidth: 1}}
          flagStyle={{marginTop: 25}}
          textProps={{label: 'Mobile Number'}}
          onChangePhoneNumber={(number) => props.onMobileNumberChange(number)}
        />
        {mobileNumberError}
        <View style={styles.separator} />

        <UnderlinedInput
          label={Constants.PASSWORD}
          isSecure={true}
          value={props.password}
          onChangeText={text => props.onPasswordChange(text)}
        />
        {passwordError}
        <View style={styles.separator} />

        <View style={styles.checkboxContainer}>
          <CheckBox
            left
            title={agreeTitle}
            checked={props.acceptTerm}
            containerStyle={styles.chkAgree}
            textStyle={styles.chkText}
            onPress={() => props.onAcceptTerm()}
          />
        </View>
        <View style={styles.separator} />
        <LgButton
          text={Constants.REGISTER}
          onPress={() => props.onSubmitPress()}
        />
    </Form>
  );
}

const styles = {
  separator: {
    marginTop: 20
  },
  chkAgree: {
    borderWidth: 0,
    backgroundColor: "white",
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    flex: 1
  },
  checkboxContainer: {
    textAlign: 'left',
    marginTop: 20
  },
  chkText: {
    fontWeight: "normal"
  }, 
  descText: {
    flexWrap: 'wrap'
  },
  linkText: {
    flexWrap: 'wrap',
    color: '#2aabe2'
  }
};

export default RegisterForm;
