import React, { Component } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Constants } from "../../config";
import styles from "./styles";
import { Headers, Misc, Forms } from "../../components";

class ReturnChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wristbandId: "",
      phoneNumber: ""
    };
  }

  gotoFindChildren() {
    this.resetState();
    this.props.navigation.navigate("_findChild");
  }

  resetState() {
    this.setState({
      wristbandId: "",
      phoneNumber: ""
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: "#FFF", flex: 1 }}
        forceInset={{ top: "never" }}
      >
        <Container>
          <Headers.BackButtonHeader
            title="Login"
            onBackPress={() => this.props.navigation.goBack()}
          />
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
          >
            <View style={styles.content}>
              <Misc.AuthTitleSub
                title="Find parent"
                subtitle="Input Wristband ID"
              />

              <View style={{ marginTop: 20 }}>
                <Forms.ReturnChildForm
                  wristbandId={this.state.wristbandId}
                  onWristbandId={text =>
                    this.setState({ wristbandId: text })
                  }
                  phoneNumber={this.state.phoneNumber}
                  onPhoneNumber={text => this.setState({ phoneNumber: text })}
                  onSubmitPress={() => this.gotoFindChildren()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Container>
      </SafeAreaView>
    );
  }
}

export default ReturnChild;
