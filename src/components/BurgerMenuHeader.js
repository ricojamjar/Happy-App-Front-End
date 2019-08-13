import React from "react";
import MenuButton from "./MenuButton";
import { StyleSheet, View } from "react-native";

export default function BurgerMenuHeader(props) {
  const { navigation } = props;
  return (
    <View style={styles.headerWrap}>
      <MenuButton navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  headerWrap: {
    height: 70,
    backgroundColor: "#feeec1"
  }
});
