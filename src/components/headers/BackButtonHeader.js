import React from "react";
import { Platform, StatusBar } from "react-native";
import { Header, Left, Body, Right, Title } from "native-base";
import { Feather } from "@expo/vector-icons";
import getHeaderContainerStyle from "./getHeaderContainerStyle";

function BackButtonHeader(props) {
  return (
    <Header style={getHeaderContainerStyle(props.nomargin)}>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <Left>
        <Feather
          name={props.closeIcon === true ? "x" : "arrow-left"}
          style={styles.icon}
          onPress={() => props.onBackPress()}
        />
      </Left>
      <Body style={{ flex: 3}}>
        {!!props.title && <Title style={styles.title}>{props.title}</Title>}
      </Body>
      <Right />
    </Header>
  );
}

const styles = {
  icon: {
    color: "#2E2F4F",
    fontSize: 25
  },
  title: {
    color: "#000",
    fontFamily: "LatoBold",
    fontSize: 18,
    textAlign: "center",
    alignSelf: 'center',
    ...Platform.select({
      android: { marginLeft: 30 }
    })
  }
};

export default BackButtonHeader;
