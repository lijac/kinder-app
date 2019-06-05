import React from "react";
import { View, Modal } from "react-native";
import { Container } from "native-base";
import { Constants } from "../../config";
import { Headers, Misc } from "../../components";

function LocationPermissionModal(props) {
  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={false}
      onRequestClose={() => null}
    >
      <Container>
        <Headers.BackButtonHeader
          title="Enable Location"
          nomargin={true}
          closeIcon={true}
          onBackPress={() => props.onCloseIconPress()}
        />

        <View style={styles.content}>
          <Misc.Permission
            image={require("../../assets/images/map.png")}
            title={Constants.ENABLE_LOCATION_SERVICES.toUpperCase()}
            description={Constants.LOCATION_SERVICES_PERMISSION_TEXT}
            allowText={Constants.LOCATION_SERVICES_PERMISSION_ALLOW_TEXT}
            onAllowPress={() => props.onAllowPress()}
          />
        </View>
      </Container>
    </Modal>
  );
}

const styles = {
  content: {
    flex: 1,
    padding: 16
  }
};

export default LocationPermissionModal;
