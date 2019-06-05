import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ImagePicker, Permissions } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

import { Headers, Forms } from "../../components";
import childService from "../../services/childService";
import {BASE_URL} from '../../config/constants';
import globalStyles from "../../components/globalStyles";

class EditChild extends Component {

  state = {
    isLoaded: false,
    isBusy: false
  };

  constructor(props) {
    super(props);
  }

  async onPhotoPressed() {
    //
    console.log('photo selecting');

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      }).then(result => {
        if (!result.cancelled) {
          this.setState({ imagePhoto: {uri: result.uri}})
        }
      })
      .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    const childId = this.props.navigation.state.params.childId;

    this.setState({
      isBusy: true
    });
    childService.getChild(childId).then(data => {
      this.setState({
        isBusy: false
      });
      this.setState({
        ...data.data, 
        isBusy: false,
        isLoaded: true,
        imagePhoto: data.data.pathurl?undefined:require('../../assets/images/avatar.png')
      });
    });
    // await this.props.navigation.state.params.loadChild(childId);
  }

  onEditChild() {
    // this.props.navigation.state.params.onEdit();
    this.setState({
      isBusy: true
    });
    const child = this.state;
    childService.editChild(child).then(data => {
      // console.log(data);
      this.setState({
        isBusy: false
      });

      setTimeout(() => {
        this.props.navigation.state.params.onRefresh();
        this.props.navigation.goBack();
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

  onDeleteChild() {
    Alert.alert(
      'Confirm',
      'Are you sure to delete this information?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
          this.setState({
            isBusy: true
          });
          childService.deleteChild(this.state._id).then(data => {
            this.setState({
              isBusy: false
            });
            setTimeout(() => {
              this.props.navigation.state.params.onRefresh();
              this.props.navigation.goBack();
            }, 100);
          });
        }},
      ],
      { cancelable: false }
    )
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

    let headerView = null;
    console.log(this.state.pathurl);
    
    if (this.state.imagePhoto !== undefined) {
      headerView = (<Headers.ProfileHeader
        avatar={this.state.imagePhoto}
      />);
    } else {
      headerView = (<Headers.ProfileHeader
        avatar={{uri: `${BASE_URL}${this.state.pathurl}`}}
      />);
    }
    return (
      <View style={styles.container}>
        {headerView}
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
            <Forms.EditChildForm
              wristbandId={this.state.bandId}
              childName={this.state.name}
              activationCode={this.state.activationCode}
              onChangeChildName={(text) => this.setState({name: text})}
              onChangeWristbandId={(text) => this.setState({bandId:text})}
              onChangeActivationCode={(text) => this.setState({activationCode: text})}
              onSubmitPress={() => this.onEditChild()}
              onPhotoPressed={() => this.onPhotoPressed()}
              onDeleteChild={() => this.onDeleteChild()}
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

export default EditChild;
