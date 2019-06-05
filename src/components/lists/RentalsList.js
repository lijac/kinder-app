import React from "react";
import { List } from "native-base";
import { RentalsListItem } from "../listItems";

function RentalsList(props) {
  return (
    <List
      dataArray={props.rentals}
      renderRow={rental => (
        <RentalsListItem {...rental} onPress={() => props.onItemPress()} />
      )}
    />
  );
}

export default RentalsList;
