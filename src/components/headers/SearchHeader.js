import React from "react";
import { View, StatusBar, TextInput } from "react-native";
import { Header, Item } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Constants } from "../../config";
import getHeaderContainerStyle from "./getHeaderContainerStyle";

function SearchHeader(props) {
  return (
    <Header
      style={{
        ...getHeaderContainerStyle(props.nomargin),
        ...styles.container
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Feather name="search" style={styles.icon} />
        </View>

        <Item style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={Constants.TYPE_LOCATION}
            placeholderTextColor="#A9A9A9"
            underlineColorAndroid="transparent"
            returnKeyType="search"
            value={props.searchText}
            onChangeText={text => props.onChangeSearchText(text)}
          />
        </Item>
      </View>
    </Header>
  );
}

const styles = {
  container: {
    height: 80,
    borderBottomColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    height: 40,
    borderRadius: 60
  },
  iconContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  input: {
    flex: 1,
    fontFamily: "LatoRegular",
    fontSize: 14
  },
  icon: {
    color: "#000",
    fontSize: 14
  }
};

export default SearchHeader;
