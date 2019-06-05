import React from "react";
import { View } from "react-native";
import { Item, Input, Label } from "native-base";

class UnderlinedInput extends React.Component{
  render(){
    return (
      <View>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>{this.props.label}</Label>
          <Input
            style={styles.input}
            keyboardType={this.props.keyboardType || "default"}
            maxLength={this.props.maxLength}
            secureTextEntry={this.props.isSecure}
            disabled={this.props.disabled}
            returnKeyType={this.props.returnKeyType || "next"}
            value={this.props.value}
            onChangeText={text => this.props.onChangeText(text)}
          />
        </Item>
      </View>
    );
  }
}

const styles = {
  item: {
    marginLeft: 0
  },
  label: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5C6979",
    paddingTop: 4
  },
  input: {
    fontFamily: "AvenirMedium",
    fontSize: 17,
    color: "#000"
  }
};

export default UnderlinedInput;
