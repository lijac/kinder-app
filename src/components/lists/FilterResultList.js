import React from "react";
import GridView from "react-native-gridview";
import { RentalItem } from "../listItems";

function FilterResultList(props) {
  return (
    <GridView
      data={props.result}
      itemsPerRow={2}
      itemStyle={styles.gridItem}
      renderItem={(item, sectionID, rowID, itemIndex, itemID) => (
        <RentalItem {...item} onPress={() => props.onItemPress()} />
      )}
    />
  );
}

const styles = {
  gridItem: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center"
  }
};

export default FilterResultList;
