import React from "react";
import { TouchableHighlight, View, Text } from "react-native";

function FilterCategoryItem(props) {
  return (
    <View>
      <TouchableHighlight
        style={
          props.active === true ? styles.active.container : baseStyles.container
        }
        onPress={() => props.onPress()}
        underlayColor="#EFF1F5"
      >
        <View>
          <Text
            style={
              props.active === true ? styles.active.label : baseStyles.label
            }
          >
            {props.label}
          </Text>
        </View>
      </TouchableHighlight>
      <View style={{ height: 10 }} />
    </View>
  );
}

const baseStyles = {
  container: {
    height: 40,
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: "#EFF1F5",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontFamily: "AvenirMedium",
    fontSize: 15,
    color: "#000"
  }
};

const styles = {
  active: {
    container: {
      ...baseStyles.container,
      backgroundColor: "#FFF",
      borderColor: "#000",
      borderWidth: 2
    },
    label: {
      ...baseStyles.label,
      color: "#000"
    }
  }
};

export default FilterCategoryItem;
