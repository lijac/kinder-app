import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { Constants } from "../../config";
import { Headers, Misc, Modals } from "../../components";
import { Button } from "react-native-elements";
import { LgButton } from "../../components/buttons";
import LottieView from 'lottie-react-native';

class ChildrensEmpty extends Component {
  static navigationOptions = {
    headerTitle: "Dashboard111",
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#000000"
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      foundChildren: false
    };
  }
  onCallFounder() {
    this.setState({ foundChildren: false });
    this.props.onConnectFounder();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <LottieView
              style={styles.image}
              source={require('../../assets/json/world.json')}
              autoPlay
              loop
            />
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.descText}>
              To use KinderID you need to have a valid wristband, if you already got this, press the button below
            </Text>
          </View>

          <LgButton text="Add your first child" onPress={() => this.props.onAddChildrenPress()} />
          <View style={styles.wristBandContainer}>
            <Text style={styles.wristBandText}>
              Don't have a wristband?
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16
  },
  returnChild: {
    marginTop: 2
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 1
  },
  descContainer: {
    flex: 1
  },
  descText: {
    margin: 50,
    fontSize: 14,
    color: "#999999"
  },
  wristBandText: {
    fontSize: 18
  },
  wristBandContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
};

export default ChildrensEmpty;
