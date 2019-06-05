import React from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Spinner from 'react-native-loading-spinner-overlay';
import validator from 'validator';
import { Headers, Forms } from "../../components";
import userService from "../../services/userService";
import globalStyles from "../../components/globalStyles";

class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
      headerTitle: 'Settings',
    };
  };

  state = {
    isLoaded: false,
    isBusy: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const childId = this.props.navigation.state.params.childId;

    userService.getProfile().then(data => {
      this.setState({
        ...data.data,
        password: '',
        isLoaded: true,
        isBusy: false
      });
    });
  }

  onFormSubmitPress() {
    const profile = this.state;
    
    let hasError = false;
    let nameError = '';
    if (validator.isEmpty(profile.fullName)) {
      nameError = 'Please enter a name';
      hasError = true;
    }
    let emailError = '';
    if (!validator.isEmail(profile.email)) {
      emailError = 'Please enter a valid email';
      hasError = true;
    }

    let mobileNumberError = '';
    if (validator.isEmpty(profile.mobileNumber)) {
      mobileNumberError = 'Please enter a mobile number';
      hasError = true;
    }

    let passwordError = '';
    if (validator.isEmpty(profile.password)) {
      /*
      passwordError = 'Please enter a password';
      hasError = true;
      */
    } else if (!validator.isLength(profile.password, { min: 5, max: undefined })) {
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
    this.setState({
      isBusy: true
    });

    userService.updateProfile(profile).then(data => {
      // console.log(data);
      this.setState({
        isBusy: false
      });
      setTimeout(() => {
        this.props.navigation.state.params.onRefresh();
        this.props.navigation.goBack();
      }, 100);
    });
  }

  async onLogoutPress() {
    await userService.logout();
    this.props.navigation.state.params.onLogoutPress();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View><Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={globalStyles.spinnerTextStyle}
      /></View>
      );
    }

    return (
      <View style={styles.container}>
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
            <Forms.ProfileForm
              onSignOutPress={() => this.onLogoutPress()}
              name={this.state.fullName}
              onNameChange={text => this.setState({fullName: text})}
              email={this.state.email}
              onEmailChange={text => this.setState({email: text})}
              mobileNumber={this.state.mobileNumber}
              onMobileNumberChange={text => this.setState({mobileNumber: text})}
              sms1={this.state.sms1}
              onSms1Change={text => this.setState({sms1: text})}
              sms2={this.state.sms2}
              onSms2Change={text => this.setState({sms2: text})}
              onPasswordChange={text => this.setState({password: text})}
              nameError={this.state.nameError}
              mobileNumberError={this.state.mobileNumberError}
              emailError={this.state.emailError}
              passwordError={this.state.passwordError}
              onSubmitPress={() => this.onFormSubmitPress()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  content: {
    padding: 16
  },
  logoutText: {
    fontFamily: "LatoRegular",
    fontSize: 17,
    color: "#000",
    textAlign: "center"
  }
};

export default Profile;
