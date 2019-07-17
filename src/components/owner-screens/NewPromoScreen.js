import React from "react";
import Auth from "@aws-amplify/auth";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  View,
  ScrollView,
  Alert
} from "react-native";
import MenuButton from "../MenuButton";
import { Container, Item, Input, Icon, Picker } from "native-base";
import { postOffer, getOwnerByOwnerId } from "../../Api";
export default class PromoScreen extends React.Component {
  state = {
    offer: {
      duration: "",
      price: "",
      drink: "",
      quantity: "",
      id: "",
      data_type: "offer",
      coupon_id: "uasdgkjasd",
      active: "true",
      venueName: "",
      type: "beer"
    }
  };
  componentDidMount = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        getOwnerByOwnerId(user.username).then(ownerDetails => {
          this.setState({
            offer: {
              ...this.state.offer,
              id: ownerDetails.id,
              venueName: ownerDetails.venueName
            }
          });
        });
      })
      .catch(err => console.log(err));
  };
  onChangeText = (key, value) => {
    this.setState({ offer: { ...this.state.offer, [key]: value } });
  };
  submit = () => {
    postOffer(this.state.offer);
    this.setState({ loading: true });
  };
  render() {
    const { duration, price, drink, quantity } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Text style={styles.Text}>Create a new promo</Text>
                  {/*  duration section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={this.state.duration}
                      placeholder="duration (minutes)"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("duration", value)
                      }
                    />
                  </Item>
                  {/*  price section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={price}
                      placeholder="Price £"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      ref="SecondInput"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("price", value)}
                    />
                  </Item>
                  {/*  drink section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={drink}
                      placeholder="Drink"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref="ThirdInput"
                      onSubmitEditing={event => {
                        this.refs.FourthInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("drink", value)}
                    />
                  </Item>
                  {/*  quantity section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Input
                      style={styles.input}
                      value={quantity}
                      placeholder="Quantity"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref="FourthInput"
                      onSubmitEditing={event => this.submit()}
                      onChangeText={value =>
                        this.onChangeText("quantity", value)
                      }
                    />
                  </Item>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Wallet" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                  </Picker>
                  <TouchableOpacity
                    onPress={() => this.submit()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDD96E",
    justifyContent: "center",
    flexDirection: "column"
  },
  input: {
    textAlign: "center",
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#5a52a5"
  },
  infoContainer: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#FDD96E"
  },
  itemStyle: {
    marginBottom: 10,
    borderColor: "#5a52a5"
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#61a0d4",
    padding: 14,
    marginBottom: 10,
    borderRadius: 24
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  textStyle: {
    padding: 5,
    fontSize: 18
  },
  countryStyle: {
    flex: 1,
    backgroundColor: "#99ff",
    borderTopColor: "#211f",
    borderTopWidth: 1,
    padding: 12
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#211f",
    backgroundColor: "#fff3"
  },
  Text: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#5a52a5",
    marginBottom: 20
  }
});
