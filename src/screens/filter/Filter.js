import React from "react";
import { View, Text } from "react-native";
import { Content } from "native-base";
import { Constants } from "../../config";
import { Headers, Misc, Buttons } from "../../components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import numeral from "numeral";

function createCategories(props) {
  let res = [];
  for (let i = 0; i < props.categories.length; i++) {
    const category = props.categories[i];
    res.push(
      <Misc.FilterCategory
        key={i}
        title={category.title}
        items={category.filters}
        active={props.active}
        onItemPress={index => props.onItemPress(i, index)}
      />
    );
  }

  return res;
}

function Filter(props) {
  return (
    <View style={styles.container}>
      <Headers.BackButtonHeader
        title={Constants.FILTER}
        onBackPress={() => props.onBackButtonPress()}
      />

      <Content style={styles.content}>
        {createCategories(props)}

        <Text style={styles.sliderTitle}>
          Price Range: {numeral(props.startPrice).format("0,0")} -{" "}
          {numeral(props.stopPrice).format("0,0")}
        </Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderValuesContainer}>
            <Text style={styles.sliderValueText}>
              {numeral(props.minPrice).format("0,0")}
            </Text>
            <Text style={styles.sliderValueText}>
              {numeral(props.maxPrice).format("0,0")}
            </Text>
          </View>

          <MultiSlider
            min={props.minPrice}
            max={props.maxPrice}
            step={100}
            sliderLength={300}
            values={[props.startPrice, props.stopPrice]}
            onValuesChange={values => props.onPriceRangeChange(values)}
            allowOverlap
            snapped
            markerStyle={styles.markerStyle}
            containerStyle={styles.sliderContainerStyle}
          />
        </View>

        <View style={styles.submitButtonContainer}>
          <Buttons.SmButton
            busy={props.busy}
            text={Constants.DONE}
            onPress={() => props.onSubmitPress()}
          />
        </View>
      </Content>
    </View>
  );
}

const SLIDER_MARKER_DIMS = 20;

const styles = {
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16
  },
  sliderContainer: {
    marginTop: 10
  },
  sliderValuesContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sliderValueText: {
    fontFamily: "AvenirMedium",
    fontSize: 15,
    color: "#000"
  },
  priceRangeText: {
    fontFamily: "AvenirMedium",
    fontSize: 17,
    color: "#000"
  },
  sliderTitle: {
    fontFamily: "LatoBlack",
    fontSize: 15,
    color: "#000"
  },
  sliderContainerStyle: {
    alignItems: "center",
    marginTop: 5,
    height: 20
  },
  markerStyle: {
    backgroundColor: "#000",
    borderColor: "#FFF",
    borderWidth: 3,
    height: SLIDER_MARKER_DIMS,
    width: SLIDER_MARKER_DIMS,
    borderRadius: SLIDER_MARKER_DIMS / 2
  },
  submitButtonContainer: {
    alignSelf: "center",
    marginBottom: 20
  }
};

export default Filter;
