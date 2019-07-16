import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import VenueName from "./VenueName";
import Drink from "./Drink";
import Price from "./Price";
import Quantity from "./Quantity";
import VenueImage from "./VenueImage";
import Emoji from "./Emoji";
import styled from "styled-components";
import CountDown from "react-native-countdown-component";

const Card = styled.View`
  width: 300;
  background: #1cbbf3;
  min-height: 80;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  border-radius: 5px;
  elevation: 4;
`;

const DealWrapper = styled.View`
  flex: 1;
  margin: 10px;
  padding: 5px;
  background: #b9f0f8;
  border-radius: 5px;
  elevation: 3;
  justify-content: center;
  align-items: center;
`;

const LeftContainer = styled.View`
  align-items: center;
  margin: 10px 0 10px 10px;
  flex: 1;
  padding-left: 3px;
`;

const QuantityPriceWrapper = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 15;
`;

const CountdownWrapper = styled.View``;

export default function DealCard(props) {
  const {
    active,
    venueName,
    drink,
    price,
    quantity,
    venueImg,
    type,
    duration
  } = props;

  return (
    <Card>
      <LeftContainer>
        <VenueName name={venueName} />
        <CountdownWrapper>
          <CountDown
            until={duration}
            size={15}
            timeToShow={["M", "S"]}
            digitStyle={{ backgroundColor: "#feeec1" }}
            digitTxtStyle={{ color: "#1cbbf3" }}
            timeLabels={{ m: "Mins", s: "Secs" }}
          />
        </CountdownWrapper>
      </LeftContainer>

      <DealWrapper>
        <Emoji type={type} />
        <Drink drink={drink} />
        <QuantityPriceWrapper>{`${quantity} for ${price}`}</QuantityPriceWrapper>
      </DealWrapper>
    </Card>
  );
}
