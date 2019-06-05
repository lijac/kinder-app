import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Container, Content } from "native-base";
import { Constants } from "../../config";
import { Headers, Modals, ListItems, Buttons } from "../../components";

class HouseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactOwnerModalVisible: false
    };
  }

  createHouseDetailsItems() {
    let res = [];
    const ITEMS = Constants.HOUSE_DETAILS;
    for (let i = 0; i < ITEMS.length; i++) {
      const item = ITEMS[i];
      res.push(<ListItems.HouseDetailListItem key={i} {...item} />);
    }

    return res;
  }

  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: "#FFF", flex: 1 }}
        forceInset={{ top: "never" }}
      >
        <Container>
          <Headers.BackButtonHeader
            title="House Details"
            nomargin={true}
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={{ height: 200 }}>
            <Image
              source={require("../../assets/images/rentals/rental2.jpeg")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Content style={styles.content}>
            <Text style={styles.title}>
              2BHK Residential apartment for sale
            </Text>
            <Text style={styles.subtitle}>
              3995 Capitol Avenue, Mount Meridian, Indiana
            </Text>

            <Text style={styles.price}>13, 500</Text>
            <Text style={styles.subtitle}>Per Month</Text>

            <View style={{ marginBottom: 20 }}>
              {this.createHouseDetailsItems()}
            </View>
          </Content>

          <View style={{ padding: 8 }}>
            <Buttons.LgButton
              text={Constants.CONTACT_OWNER}
              onPress={() => this.setState({ contactOwnerModalVisible: true })}
            />
          </View>

          {this.state.contactOwnerModalVisible === true && (
            <Modals.ContactOwnerModal
              onCallPress={() =>
                this.setState({ contactOwnerModalVisible: false })
              }
            />
          )}
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = {
  content: {
    padding: 16
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: "stretch"
  },
  title: {
    fontFamily: "AvenirMedium",
    fontSize: 15,
    color: "#000"
  },
  subtitle: {
    fontFamily: "AvenirMedium",
    fontSize: 13,
    color: "#5F5F5F",
    marginTop: 5
  },
  price: {
    fontFamily: "LatoBlack",
    fontSize: 17,
    color: "#000",
    marginTop: 15
  }
};

export default HouseDetail;
