import React, { Component } from "react";
import { View, Modal, Text } from "react-native";
import { Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { Headers, Misc, Forms } from "../../components";


class PrivacyHelp extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => null}
      >
        <Container>
          <Headers.BackButtonHeader
            title="Privacy Policy"
            nomargin={true}
            closeIcon={true}
            onBackPress={() => this.props.onCloseIconPress()}
          />
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
          >
            <View style={styles.content}>
              <Misc.AuthTitleSub
                title="Privacy Policy"
                subtitle=""
              />
              <View style={{ marginTop: 20 }}>
                <Text>....</Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Container>
      </Modal>
    );
  }
}

export default PrivacyHelp;
