import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from 'expo';
import styles from "./styles";

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("_home");
    }, 5000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#ff0d47','#ff6170', '#ffaf98']} style={{flex:1}}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode={'contain'}
                source={require("../../assets/images/logos/kinder-logo-white.png")}
                style={styles.image}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default Splash;
