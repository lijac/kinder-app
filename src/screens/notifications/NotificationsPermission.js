import React from "react";
import { View } from "react-native";
import { Constants } from "../../config";
import { Headers, Misc } from "../../components";

function NotificationsPermission(props) {
  return (
    <View style={styles.container}>
      <Headers.TitleHeader title="Notifications" />
      <View style={styles.content}>
        <Misc.Permission
          image={require("../../assets/images/bell.png")}
          description={Constants.NOTIFICATIONS_PERMISSION_TEXT}
          allowText={Constants.NOTIFICATIONS_PERMISSION_ALLOW_TEXT}
          onAllowPress={() => props.onAllowPress()}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16
  }
};

export default NotificationsPermission;
