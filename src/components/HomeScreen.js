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

  getOffersAndFilter = () => {
    getOffers()
      .then(offers => {
        const sortedOffers = offers
          .sort((a, b) => {
            return b.createdAt - a.createdAt;
          })
          .filter(offer => {
            return offer.durationInSeconds > 0;
          });
        this.setState({ sortedOffers, loading: false, refreshing: false });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getOffersAndFilter();
  }
  componentDidUpdate() {
    // setTimeout(this.getOffersAndFilter(), 3000)
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getOffersAndFilter();
  };

  render() {
    const { sortedOffers } = this.state;
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
              {sortedOffers.map(offer => {
                const {
                  coupon_id,
                  drink,
                  price,
                  quantity,
                  type,
                  duration,
                  venueName,
                  itemId,
                  durationInSeconds
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
                          venueName,
                          durationInSeconds
                        })
                      }
                    >
                      <DealCard
                        drink={drink}
                        price={price}
                        quantity={quantity}
                        type={type}
                        venueName={venueName}
                        durationInSeconds={durationInSeconds}
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
}
