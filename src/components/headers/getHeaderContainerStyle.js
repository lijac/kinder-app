import { Platform } from "react-native";

function getHeaderContainerStyle(nomargin) {
  return {
    backgroundColor: "#FFF",
    borderBottomColor: "#FFF",
    ...Platform.select({
      android: { marginTop: nomargin ? 0 : 24 }
    })
  };
}

export default getHeaderContainerStyle;
