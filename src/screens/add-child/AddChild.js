import React, { Component } from "react";
import { View, Button, Modal, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImagePicker, Permissions } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import { Constants } from "../../config";
import styles from "./styles";
import { Headers, Misc, Forms } from "../../components";
import childService from "../../services/childService";
import globalStyles from "../../components/globalStyles";

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Child Photo',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class AddChild extends Component {

  constructor(props) {
    super(props);

    this.register = this.register.bind(this);

    this.state = {
      childName: "",
      wristbandId: "",
      activationCode: "",
      imagePhoto: null
    };
  }

  register() {
    // this.resetState();

    this.setState({
      isBusy: true
    });

    // setTimeout(() => {
      const child = this.state;
      // @TODO
      childService.addChild(child).then(data => {
        this.setState({
          isBusy: false
        });
        // console.log(data);
        this.props.onAdd();
      }).catch(error => {
        this.setState({
          isBusy: false
        });
        setTimeout(() => {
          Alert.alert('Oops!', error.response.data.message);
        }, 100);
      });
    // }, 100);

    // this.props.onAdd();
    // this.props.navigation.state.params.onAdd();
    // this.props.navigation.goBack();
  }

  resetState() {
    this.setState({
      childName: "",
      wristbandId: "",
      activationCode: ""
    });
  }

  validateInputs(text, type) {
    if (type == 'bandid') {

    } else {
      
    }
  }

  async onPhotoPressed() {
    //
    console.log('photo selecting');

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status === 'granted') {
      ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      }).then(result => {
        if (!result.cancelled) {
          this.setState({ imagePhoto: result.uri, createPostModalVisible: true })
        }
      })
      .catch(err => console.log(err))
    }
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
            title="Add Child"
            nomargin={true}
            closeIcon={true}
            onBackPress={() => this.props.onCloseIconPress()}
          />
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
          >
          <Spinner
              visible={this.state.isBusy}
              textContent={'Loading...'}
              textStyle={globalStyles.spinnerTextStyle}
            />
            <View style={styles.content}>
              <Misc.AuthTitleSub
                title={Constants.HI_THERE}
                subtitle="Fill in the information below"
              />
              <View style={{ marginTop: 20 }}>
                <Forms.AddChildForm
                  childName={this.state.childName}
                  onChangeChildName={text =>
                    this.setState({ childName: text })
                  }
                  wristbandId={this.state.wristbandId}
                  onChangeWristbandId={text =>
                    this.setState({ wristbandId: text })
                  }
                  activationCode={this.state.activationCode}
                  imagePhoto={this.state.imagePhoto}
                  onPhotoPressed={() => this.onPhotoPressed()}
                  onChangeActivationCode={text =>
                    this.setState({ activationCode: text })
                  }
                  onSubmitPress={() => this.register()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Container>
      </Modal>
    );
  }
}

export default AddChild;
