import React, { Component } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from 'react-native-loading-spinner-overlay';
import Config from 'react-native-config'

import { Constants } from "../../config";
import styles from "./styles";
import { Misc, Forms } from "../../components";
import userService  from "../../services/userService";
import globalStyles from "../../components/globalStyles";

class Login extends Component {

  state = {
    email: "",
    password: "",
    isBusy: false
  };

  constructor(props) {
    super(props);
    console.log(Config);
  }

  componentDidMount() {
    
  }

  login() {
    // this.resetState();

    // @TODO validation
    this.setState({
      isBusy: true
    });

    userService.login(this.state.email, this.state.password).then(response => {
      this.setState({
        isBusy: false
      });
      setTimeout(() => {
        this.props.navigation.navigate("_dashboard",{
          name: this.state.email
        });
      }, 100);
    }).catch(error => {
      this.setState({
        isBusy: false
      });
      setTimeout(() => {
        Alert.alert('Oops!', error.response.data.message);
      }, 100);
    });
    
  }

  navigateToRegister() {
    this.resetState();
    this.props.navigation.navigate("_register");
  }

  navigateToResetPassword() {
    this.resetState();
    this.props.navigation.navigate("_resetpassword");
  }

  resetState() {
    this.setState({
      email: "",
      password: "",
      isBusy: false
    });
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
                title={Constants.WELCOME}
                subtitle={Constants.SIGN_IN_TEXT}
              />
              <View style={{ marginTop: 20 }}>
                <Forms.LoginForm
                  email={this.state.email}
                  onEmailChange={text =>
                    this.setState({ email: text })
                  }
                  password={this.state.password}
                  onPasswordChange={text => this.setState({ password: text })}
                  onCreateAccountPress={() => this.navigateToRegister()}
                  onForgetPasswordPress={() => this.navigateToResetPassword()}
                  onSubmitPress={() => this.login()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Container>
      </SafeAreaView>
    );
  }
}

export default Login;
