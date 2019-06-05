import React from "react";
import { List } from "native-base";
import { ChildrenListItem } from "../listItems";

function ChildrenList(props) {
  return (
    <List
      dataArray={props.children}
      renderRow={child => <ChildrenListItem {...child} 
        onPress={() => props.onSelectChildren(child._id)}
        onLongPress={() => props.onDeleteChildren(child._id)}
        onUpdateChildren={() => props.onUpdateChildren()}
         />}
    />
  );
}

export default ChildrenList;
