import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DealCard from "../deals-screen/DealCard";
import QRCode from "react-native-qrcode";
import { LinearGradient } from "expo-linear-gradient";
import MenuButton from "../MenuButton";

export default function PromoScreen(props) {
  /*getting items from props*/
  const { navigation } = props;

  const venueName = navigation.getParam("venueName", "No Name");
  const venueImg = navigation.getParam("venueImg", "No Venue Image");
  const drink = navigation.getParam("drink", "No Drink");
  const price = navigation.getParam("price", "No Price");
  const quantity = navigation.getParam("quantity", "No Quantity");
  const type = navigation.getParam("type", "No Type");
  const couponID = navigation.getParam("couponID", "No Coupon ID");
  const durationInSeconds = navigation.getParam("durationInSeconds");

  return (
    <View style={styles.container}>
      <MenuButton navigation={navigation} />
      <View style={styles.qrcode}>
        <QRCode value={couponID} size={250} bgColor="#1cbbf3" fgColor="white" />
      </View>
      <View style={styles.dealcard}>
        <DealCard
          venueName={venueName}
          drink={drink}
          price={price}
          quantity={quantity}
          type={type}
          durationInSeconds={durationInSeconds}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdd96e",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
