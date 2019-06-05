import React, { Component } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import validator from 'validator';
import Spinner from 'react-native-loading-spinner-overlay';

import { Constants } from "../../config";
import styles from "./styles";
import { Headers, Misc, Forms } from "../../components";
import globalStyles from "../../components/globalStyles";
import userService from "../../services/userService";
import PrivacyHelp from "../helps/PrivacyHelp";
import TermHelp from "../helps/TermHelp";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      acceptTerm: false,
      nameError: "",
      emailError: '',
      mobileNumberError: '',
      passwordError: '',
      sms1: '',
      sms2: '',
      isBusy: false
    };
  }

  register() {
    // 
    // this.props.navigation.navigate("_dashboard");
    const newUser = this.state;
    if (!newUser.acceptTerm) {
      Alert.alert("Confirm", "You have to confirm the Terms and Conditions");
      return;
    }

    let hasError = false;
    let nameError = '';
    if (validator.isEmpty(newUser.name)) {
      nameError = 'Please enter a name';
      hasError = true;
    }
    let emailError = '';
    if (!validator.isEmail(newUser.email)) {
      emailError = 'Please enter a valid email';
      hasError = true;
    }

    let mobileNumberError = '';
    if (validator.isEmpty(newUser.mobileNumber)) {
      mobileNumberError = 'Please enter a mobile number';
      hasError = true;
    }

    let passwordError = '';
    
    if (validator.isEmpty(newUser.password)) {
      passwordError = 'Please enter a password';
      hasError = true;
    }

    if (!validator.isLength(newUser.password, { min: 5, max: undefined })) {
      passwordError = 'Your password must be at least 5 characters';
      hasError = true;
    }
    
    this.setState({
      nameError: nameError,
      emailError: emailError,
      mobileNumberError: mobileNumberError,
      passwordError: passwordError
    });

    if (hasError) {
      // alert('Invalid Field');
      return;
    }
    newUser.fullName = newUser.name;

    this.setState({
      isBusy: true
    });

    userService.register(newUser).then(response => {
      this.setState({
        isBusy: false
      });
      setTimeout(() => {
        if (response.success) {
          Alert.alert("Success", "Successfully registered");
          this.props.navigation.navigate("_login");
        } else {
          Alert.alert("Failed", response.message);
        }
      }, 100);

    }).catch(error => {
      this.setState({
        isBusy: false
      });
      // console.log(error);
      setTimeout(() => {
        Alert.alert('Oops!', error.response.data.message);
      }, 100);
    });

    // this.resetState();
  }

  resetState() {
    this.setState({
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      acceptTerm: false,
      nameError: "",
      emailError: '',
      mobileNumberError: '',
      passwordError: '',
      sms1: '',
      sms2: '',
      isBusy: false
    });
  }

  onClickAcceptTerm() {
    this.setState({ acceptTerm: !this.state.acceptTerm });
  }

  onClickTerms() {
    this.setState({help: 1});
  }

  onClickPrivacy() {
    this.setState({help: 2});
  }
  onCloseIconPress() {
    this.setState({help: 0});
  }

  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: "#FFF", flex: 1 }}
        forceInset={{ top: "never" }}
      >
        <Container>
          <Spinner
            visible={this.state.isBusy}
            textContent={'Loading...'}
            textStyle={globalStyles.spinnerTextStyle}
          />
          <TermHelp
            visible={this.state.help == 1}
            onCloseIconPress={() => this.onCloseIconPress()} />
          <PrivacyHelp
            visible={this.state.help == 2}
            onCloseIconPress={() => this.onCloseIconPress()} />
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
          >
            <View style={styles.content}>
              <Misc.AuthTitleSub
                title={Constants.HI_THERE}
                subtitle={Constants.REGISTER_DESC_TEXT}
              />
              <View style={{ marginTop: 20 }}>
                <Forms.RegisterForm
                  name={this.state.name}
                  onNameChange={text => this.setState({ name: text })}
                  email={this.state.email}
                  onEmailChange={text =>
                    this.setState({ email: text })
                  }
                  mobileNumber={this.state.mobileNumber}
                  onMobileNumberChange={text =>
                    this.setState({ mobileNumber: text })
                  }
                  password={this.state.password}
                  onPasswordChange={text => this.setState({ password: text })}
                  sms1={this.state.sms1}
                  onSms1Change={text => this.setState({sms1: text})}
                  sms2={this.state.sms2}
                  onSms2Change={text => this.setState({sms2: text})}
                  acceptTerm={this.state.acceptTerm}
                  nameError={this.state.nameError}
                  mobileNumberError={this.state.mobileNumberError}
                  emailError={this.state.emailError}
                  passwordError={this.state.passwordError}
                  onAcceptTerm={() => this.onClickAcceptTerm()}
                  onSubmitPress={() => this.register()}
                  onClickTerms={() => this.onClickTerms()}
                  onClickPrivacy={() => this.onClickPrivacy()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Container>
      </SafeAreaView>
    );
  }
}

export default Register;
