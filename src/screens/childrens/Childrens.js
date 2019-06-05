import React, { Component } from "react";
import { View } from "react-native";
import GradientButton from "react-native-gradient-buttons";
import { Constants } from "../../config";
import { Headers, Lists } from "../../components";
import { PlusButton } from "../../components/buttons";

class Childrens extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Lists.ChildrenList
            children={this.props.children}
            onSelectChildren={(childId) => this.props.onSelectChildren(childId)}
            onDeleteChildren={(childId) => this.props.onDeleteChildren(childId)}
          />
        </View>
        <View style={styles.addButton}>
          <PlusButton onPress={() => this.props.onAddChildrenPress()}/>
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
  addButton: {
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Childrens;
