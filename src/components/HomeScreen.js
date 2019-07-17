import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl
} from "react-native";
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
  state = { offers: [], loading: true, time: Date.now(), refreshing: false };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    getOffers()
      .then(offers => {
        offers.sort((a, b) => {
          b.createdAt - a.createdAt;
        });
        this.setState({ offers, loading: false, refreshing: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
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
                  duration,
                  venueName,
                  itemId
                } = offer;
                return (
                  <View key={itemId}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate("Coupon", {
                          drink,
                          price,
                          quantity,
                          type,
                          coupon_id,
                          duration,
                          venueName
                        })
                      }
                    >
                      <DealCard
                        drink={drink}
                        price={price}
                        quantity={quantity}
                        type={type}
                        duration={duration}
                        venueName={venueName}
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
    getOffers().then(offers => {
      offers.sort((a, b) => {
        b.createdAt - a.createdAt;
      });
      this.setState({ offers, loading: false });
    });
  }
}
