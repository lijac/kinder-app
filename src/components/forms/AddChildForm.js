import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { Form, Button } from "native-base";
import { MaskService } from 'react-native-masked-text';

import { Constants } from "../../config";
import { UnderlinedInput } from "../inputs";
import { LgButton, PlusButton } from "../buttons";

function AddChildForm(props) {
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
              maxLength={9}
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
              }}
            />
          </View>
          <View style={{flex: 0.2}}>
            {props.imagePhoto && <TouchableHighlight style={{flex: 1}} onPress={() => props.onPhotoPressed()} ><Image source={{ uri: props.imagePhoto }} style={{ flex: 1 }} 
              resizeMode="contain"  /></TouchableHighlight>} 
            {!props.imagePhoto && <PlusButton size={40} onPress={() => props.onPhotoPressed()}/> }
          </View>        
        </View>
        <View style={styles.separator} />

        <UnderlinedInput
          label="Activation Code"
          value={props.activationCode}
          maxLength={6}
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
          text="Register child"
          onPress={() => props.onSubmitPress()}
        />
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
  }
};

export default AddChildForm;
