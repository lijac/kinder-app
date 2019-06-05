import React, { Component } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from 'react-native-loading-spinner-overlay';
import validator from 'validator';

import { Constants } from "../../config";
import styles from "./styles";
import { Headers, Misc, Forms } from "../../components";
import userService from "../../services/userService";
import globalStyles from "../../components/globalStyles";

class ResetPassword extends Component {
  state = {
    email: "",
    isBusy: false,
    emailError: ''
  };
  constructor(props) {
    super(props);
  }

  resetState() {
    this.setState({
      email: "",
      isBusy: false
    });
  }

  onResetPassword() {

    let hasError = false;
    let emailError = '';

    if (validator.isEmpty(this.state.email)) {
      emailError = 'Please enter your email';
      hasError = true;
    }
    if (!validator.isEmail(this.state.email)) {
      emailError = 'Please enter a valid email';
      hasError = true;
    }

    this.setState({
      emailError: emailError
    });

    if (hasError) {
      return;
    }

    this.setState({
      isBusy: true
    });
    userService.sendForgotPassword(this.state.email).then(data => {
      this.setState({
        isBusy: false
      });
      setTimeout(() => {
        Alert.alert('Sent', 'Reset email was sent.');
        this.props.navigation.navigate("_login");
      }, 100);
    }).catch(error => {
      this.setState({
        isBusy: false
      });
      setTimeout(() => {
        Alert.alert('Oops!', error.response.data.message);
      }, 100);
    });
    // this.resetState();
    // this.props.navigation.navigate("_login");
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
            <KeyboardAwareScrollView
              enableOnAndroid
              enableAutomaticScroll
              keyboardOpeningTime={0}
            >
              <View style={styles.content}>
                <Misc.AuthTitleSub
                  title="Forgot password"
                  subtitle="Input your email address"
                />
                <View style={{ marginTop: 20 }}>
                  <Forms.ResetPasswordForm
                    email={this.state.email}
                    emailError={this.state.emailError}
                    onEmailChange={text => 
                      this.setState({email: text})
                    }
                    onSubmitPress={() => this.onResetPassword()}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </Container>
        </SafeAreaView>
    );
  }
}

export default ResetPassword;
