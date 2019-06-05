import React from "react";
import { View, Text } from "react-native";
import { FilterCategoryItem } from "../listItems";

function createItems(props) {
  let res = [];
  for (let i = 0; i < props.items.length; i++) {
    const item = props.items[i];
    res.push(
      <FilterCategoryItem
        key={i}
        label={item}
        active={props.active.includes(item)}
        onPress={() => props.onItemPress(i)}
      />
    );
  }

  return res;
}

function FilterCategory(props) {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.filtersContainer}>{createItems(props)}</View>
    </View>
  );
}

const styles = {
  title: {
    fontFamily: "LatoBlack",
    fontSize: 15,
    color: "#000"
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10
  }
};

export default FilterCategory;
