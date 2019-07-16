import React from "react";
import Auth from "@aws-amplify/auth";
import Loading from "../Loading";
import { getOwner, postOwner } from "../../Api";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert
} from "react-native";
import { Container, Item, Input, Icon } from "native-base";

const INITIAL_STATE = {
  profile: {
    id: "",
    email: "",
    phoneNumber: "",
    place_id: "",
    longDescription: null,
    address: "",
    venueName: "",
    shortDescription: null,
    data_type: "profile",
    photoUri: null,
    latitude: 53.4868458,
    longitude: -2.2401032
  },
  loading: false
};
export default class HomeScreen extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          profile: {
            ...this.state.profile,
            email: user.attributes.email,
            id: user.username
          }
        });
      })
      .catch(err => console.log(err));
  };
  onChangeText = (key, value) => {
    this.setState({ profile: { ...this.state.profile, [key]: value } });
  };
  getOwner = () => {
    this.setState({ loading: true });
    const { phoneNumber } = this.state.profile;
    getOwner(phoneNumber)
      .then(
        ({
          formatted_address,
          geometry: {
            location: { lat, lng }
          },
          name,
          place_id
        }) => {
          this.setState({
            profile: {
              ...this.state.profile,
              address: formatted_address,
              venueName: name,
              place_id,
              latitude: lat,
              longitude: lng,
              phoneNumber
            },
            loading: false
          });
        }
      )
      .then(() => {
        postOwner(this.state.profile).then(() => {
          this.props.navigation.navigate("OwnerApp");
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        Alert.alert(
          "Error when register: please provide the correct telephone format"
        );
      });
  };
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out from the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel"
        },
        // Calling signOut
        {
          text: "OK",
          onPress: () => this.signOut()
        }
      ],
      { cancelable: false }
    );
  };
  // Confirm sign out
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        this.props.navigation.navigate("Landing");
      })
      .catch(err => {
        if (!err.message) {
          Alert.alert("Error changing password: ", err);
        } else {
          Alert.alert("Error changing password: ", err.message);
        }
      });
  };
  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
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
                  <Text style={styles.Text}>
                    Use your phone number registered in Google Maps, be sure to
                    remove the first 0 and add the 44 prefix
                  </Text>
                  {/*  phone_number section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="call" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="441614567890"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.getOwner();
                      }}
                      onChangeText={value =>
                        this.onChangeText("phoneNumber", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.getOwner()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.buttonStyle,
                      {
                        marginTop: 20,
                        flexDirection: "row",
                        justifyContent: "center"
                      }
                    ]}
                    onPress={this.signOutAlert}
                  >
                    <Icon
                      name="md-power"
                      style={{ color: "#FFF", paddingRight: 10 }}
                    />
                    <Text style={styles.buttonText}>Sign Out</Text>
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
    backgroundColor: "#23ccc9",
    justifyContent: "center",
    flexDirection: "column"
  },
  input: {
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
    backgroundColor: "#23ccc9"
  },
  itemStyle: {
    marginBottom: 10,
    borderColor: "#5a52a5"
  },
  iconStyle: {
    color: "#5a52a5",
    fontSize: 28,
    marginLeft: 15
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
