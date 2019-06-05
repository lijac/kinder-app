import React from "react";
import { View } from "react-native";
import { Constants } from "../../config";
import { Headers, Lists } from "../../components";

function Notifications(props) {
  return (
    <View style={styles.container}>
      <Headers.BackButtonHeader
        title={Constants.NOTIFICATIONS}
        onBackPress={() => props.onBackButtonPress()}
      />
      <View style={styles.content}>
        <Lists.NotificationsList
          notifications={Constants.SAMPLE_NOTIFICATIONS}
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

export default Notifications;
