import React from "react";
import { View, Text, FlatList } from "react-native";
import RentalItem from "./RentalItem";

function RentalsListItem(props) {
  return (
    <View>
      <Text style={styles.heading}>{props.heading}</Text>
      <View style={{ marginTop: 10 }}>
        <FlatList
          horizontal={true}
          data={props.rentalItems}
          renderItem={({ item }) => (
            <RentalItem spaced {...item} onPress={() => props.onPress()} />
          )}
        />
      </View>
      <View style={{ height: 15 }} />
    </View>
  );
}

const styles = {
  heading: {
    fontFamily: "AvenirMedium",
    fontSize: 16,
    color: "#5F5F5F"
  }
};

export default RentalsListItem;
