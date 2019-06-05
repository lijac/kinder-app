import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Constants } from "../../config";
import { Buttons } from "../../components";

function ContactOwnerModal(props) {
  return (
    <Modal isVisible={true}>
      <View style={styles.container}>
        <View style={styles.btnClose}>
          <Text style={styles.btnCloseTxt} onPress={props.onDismissContact}>X</Text>
        </View>  
        <View style={styles.iconContainer}>
          <Feather name="alert-circle" style={styles.icon} />
        </View>
        <Text style={styles.heading}>Hey There</Text>
        <Text style={styles.body}>Someone have found {props.child.name} please click to connect</Text>
        <View style={{ alignItems: "center", width: '100%' }}>
          <View style={{marginTop: 10, alignSelf: "stretch"}}>
            <Buttons.LgButton
              text="Connect"
              onPress={() => props.onCallPress()}
            />
          </View>          
        </View>
      </View>
    </Modal>
  );
}

const CIRCLE_DIMS = 50;

const styles = {
  container: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 16,
    alignItems: "center"
  },
  btnClose: {
    flexDirection: 'row', justifyContent: 'flex-end' ,
    width: '100%',
    marginTop: -10,
    fontSize: 18
  },
  btnCloseTxt: {
  },
  iconContainer: {
    height: CIRCLE_DIMS,
    width: CIRCLE_DIMS,
    borderRadius: CIRCLE_DIMS / 2,
    borderWidth: 0,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 45,
    color: "#000"
  },
  heading: {
    fontFamily: "LatoBlack",
    fontSize: 20,
    color: "#000",
    marginTop: 10
  },
  body: {
    fontFamily: "AvenirMedium",
    fontSize: 15,
    color: "#A9A9A9",
    marginTop: 5,
    textAlign: "center"
  },
  boldBody: {
    fontFamily: "AvenirMedium",
    fontSize: 15,
    color: "#000",
    marginTop: 5
  }
};

export default ContactOwnerModal;
