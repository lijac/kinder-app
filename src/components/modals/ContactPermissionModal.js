import React from "react";
import { View, Modal } from "react-native";
import { Container } from "native-base";
import { Constants } from "../../config";
import { Headers, Misc } from "../../components";

function ContactPermissionModal(props) {
  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={false}
      onRequestClose={() => null}
    >
      <Container>
        <Headers.BackButtonHeader
          title="Share Contacts"
          nomargin={true}
          closeIcon={true}
          onBackPress={() => props.onCloseIconPress()}
        />

        <View style={styles.content}>
          <Misc.Permission
            image={require("../../assets/images/contacts.png")}
            title={Constants.SHARE_CONTACT_DETAILS.toUpperCase()}
            description={Constants.CONTACT_PERMISSION_TEXT}
            allowText={Constants.CONTACT_PERMISSION_ALLOW_TEXT}
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

export default ContactPermissionModal;
