import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import DealCard from "./deals-screen/DealCard";
import BurgerMenuHeader from "./BurgerMenuHeader";
import Loading from "./Loading";
import { LinearGradient } from "expo-linear-gradient";
import {
  getOffers,
  getOffersByOwnerId,
  postOwner,
  updateOwnerDetails,
  deleteOwner,
  postOffer
} from "../Api";

const MainView = styled.ScrollView`
  flex: 1;
  background-color: #fdd96e;
`;
const MapWrapper = styled.View`
  align-items: center;
`;

export default class HomeScreen extends Component {
  state = { offers: [], loading: true };
  render() {
    const { offers } = this.state;
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const { loading } = this.state;

    if (loading) return <Loading />;
    return (
      <>
        <BurgerMenuHeader navigation={navigation} />
        <MainView>
          <LinearGradient colors={["#fdd96e", "#fdc41c", "#f0a202"]}>
            <MapWrapper>
              {/* map over deals and create a card for each deal */}
              {offers.map(offer => {
                const {
                  createdAt,
                  active,
                  coupon_id,
                  drink,
                  price,
                  quantity,
                  type,
                  duration
                } = offer;

                return (
                  <View key={createdAt}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate("Coupon", {
                          drink: drink,
                          price: price,
                          quantity: quantity,
                          type: type,
                          coupon_id: coupon_id,
                          duration: duration
                        })
                      }
                    >
                      <DealCard
                        drink={drink}
                        price={price}
                        quantity={quantity}
                        type={type}
                        duration={duration}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </MapWrapper>
          </LinearGradient>
        </MainView>
      </>
    );
  }
  componentDidMount() {
    getOffers().then(offers => this.setState({ offers, loading: false }));
    // getOffersByOwnerId("03a27660-a4b7-11e9-ac27-97a3f1fac344").then(res => {
    //   console.log(res);
    // });
    // postOwner({
    // phoneNumber: "87485959063",
    // place_id: "iuhff6",
    // venueName: "Testing Post",
    // address: "Deansgate",
    // photoUri: "iuhdoidsax.com",
    // email: "billy@theWhiteParadise.com",
    // longDescription: "a cool semi paradise where people have experiences",
    // data_type: "profile",
    // shortDescription: "Paradise",
    // longitude: "54675",
    // latitude: "8697"
    // }).then(console.log);
    // updateOwnerDetails("03a27660-a4b7-11e9-ac27-97a3f1fac344", {
    //   phoneNumber: "87485959063",
    //   place_id: "iuhff6",
    //   venueName: "Testing Put",
    //   address: "Deansgate",
    //   photoUri: "iuhdoidsax.com",
    //   email: "billy@theWhiteParadise.com",
    //   longDescription: "a cool semi paradise where people have experiences",
    //   data_type: "profile",
    //   shortDescription: "Paradise",
    //   longitude: "54675",
    //   latitude: "8697"
    // }).then(console.log);
    // deleteOwner("03a27660-a4b7-11e9-ac27-97a3f1fac344");
    // postOffer({
    //   data_type: "offer",
    //   duration: "30",
    //   price: "£3.00",
    //   drink: "Mojitos!",
    //   quantity: "6",
    //   type: "🍸",
    //   coupon_id: "sdfghjuiop456789",
    //   active: "true",
    //   venueName: "Trof"
    // }).then(console.log);
  }
}
