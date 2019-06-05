import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { Form, Button } from "native-base";
import { MaskService } from 'react-native-masked-text';
import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton, PlusButton } from "../buttons";

function EditChildForm(props) {
  return (
    <Form>
        <UnderlinedInput
          label="Child name"
          value={props.childName}
          onChangeText={text => props.onChangeChildName(text)}
        />
        <View style={styles.separator} />

        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 0.8}}>
            <UnderlinedInput
              label="Wristband ID"
              value={props.wristbandId}
              onChangeText={text => {
                props.onChangeWristbandId(MaskService.toMask('custom', text, {
                    mask: 'AA 999999',
                    translation: {
                      'A': function(val) {
                        val = val.toUpperCase();
                        if (val.match(/[A-Z]/i)) {
                          return val;
                        }
                        return '';
                      }
                    }
                }));
              }
              }
            />
          </View>
          <View style={{flex: 0.2}}>
            <PlusButton size={40} onPress={() => props.onPhotoPressed()}/>
          </View>        
        </View>
        <View style={styles.separator} />

        <UnderlinedInput
          label="Activation Code"
          value={props.activationCode}
          onChangeText={text => {
            props.onChangeActivationCode(MaskService.toMask('custom', text, {
                    mask: 'SSSSSS',
                    translation: {
                      'S': function(val) {
                        return val.toUpperCase();
                      }
                    }
                }));
          }}
        />
        <Text style={styles.desc}>You have received the activation code either on email or from the retailer.</Text>
        <View style={styles.separator} />
        <LgButton
          text="Update"
          onPress={() => props.onSubmitPress()}
        />

        <View style={{ margin: 10, textAlign: 'center' }}>
          <Text style={styles.deleteText} onPress={() => props.onDeleteChild()}>
            Delete Child Info
          </Text>
        </View>
    </Form>
  );
}

const styles = {
  separator: {
    marginTop: 20
  },
  desc: {
    marginTop: 5,
    color: "#989898"
  },
  deleteText: {
    alignSelf: "center"
  }
};

export default EditChildForm;
