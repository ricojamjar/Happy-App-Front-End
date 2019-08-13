import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import VenueName from "./VenueName";
import Drink from "./Drink";
import Price from "./Price";
import Quantity from "./Quantity";
import VenueImage from "./VenueImage";
import Emoji from "./Emoji";
import CountDown from "react-native-countdown-component";

export default function DealCard(props) {
  const { venueName, drink, price, quantity, type, durationInSeconds } = props;

  return (
    <View styles={styles.card}>
      <View styles={styles.leftContainer}>
        <VenueName name={venueName} />
        <CountdownWrapper>
          <CountDown
            until={durationInSeconds}
            size={14}
            timeToShow={["M", "S"]}
            digitStyle={{ backgroundColor: "#feeec1" }}
            digitTxtStyle={{ color: "#1cbbf3" }}
            timeLabels={{ m: "Mins", s: "Secs" }}
          />
        </CountdownWrapper>
      </View>

      <View styles={styles.dealWrapper}>
        <Emoji type={type} />
        <Drink drink={drink} />
        <Text
          styles={styles.quantityPriceWrapper}
        >{`${quantity} for £${price}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: "#1cbbf3",
    minHeight: 130,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10,
    borderRadius: 5,
    elevation: 4
  },
  dealWrapper: {
    flex: 1,
    margin: 10,
    padding: 5,
    backgroundColor: "#b9f0f8",
    borderRadius: 5,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  leftContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 0,
    flex: 1,
    paddingLeft: 3
  },
  quantityPriceWrapper: {
    flex: 1,
    textAlign: "center",
    fontSize: 15
  }
});
