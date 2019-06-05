import React, { Component } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Container } from "native-base";
import { Constants } from "../../config";
import { Headers, Lists } from "../../components";

class FilterResult extends Component {
  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: "#FFF", flex: 1 }}
        forceInset={{ top: "never" }}
      >
        <Container>
          <Headers.BackButtonHeader
            title="Filter Results"
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.content}>
            <Lists.FilterResultList
              result={Constants.FILTER_RESULT}
              onItemPress={() => this.props.navigation.navigate("_houseDetail")}
            />
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = {
  content: {
    flex: 1
  }
};

export default FilterResult;
