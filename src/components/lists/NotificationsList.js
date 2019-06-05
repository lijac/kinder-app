import React from "react";
import { List } from "native-base";
import { NotificationsListItem } from "../listItems";

function NotificationsList(props) {
  return (
    <List
      dataArray={props.notifications}
      renderRow={notification => <NotificationsListItem {...notification} />}
    />
  );
}

export default NotificationsList;
