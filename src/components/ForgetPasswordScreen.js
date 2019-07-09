import React from "react";
import Auth from "@aws-amplify/auth";
import logo from "../images/beer.png";
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
export default class ScreenName extends React.Component {
  state = {
    email: "",
    authCode: "",
    newPassword: ""
  };
  // Request a new password
  async forgotPassword() {
    const { email } = this.state;
    await Auth.forgotPassword(email)
      .then(data => console.log("New code sent", data))
      .catch(err => {
        if (!err.message) {
          console.log("Error while setting up the new password: ", err);
          Alert.alert("Error while setting up the new password: ", err);
        } else {
          console.log("Error while setting up the new password: ", err.message);
          Alert.alert("Error while setting up the new password: ", err.message);
        }
      });
  }
  // Upon confirmation redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    const { email, authCode, newPassword } = this.state;
    await Auth.forgotPasswordSubmit(email, authCode, newPassword)
      .then(() => {
        this.props.navigation.navigate("SignIn");
        console.log("the New password submitted successfully");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error while confirming the new password: ", err);
          Alert.alert("Error while confirming the new password: ", err);
        } else {
          console.log("Error while confirming the new password: ", err.message);
          Alert.alert("Error while confirming the new password: ", err.message);
        }
      });
  }

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />

        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
          keyboardVerticalOffset={23}
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              {/* Infos */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* email */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="email"
                      placeholderTextColor="#0468d4"
                      keyboardType={"email-address"}
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={value => this.onChangeText("email", value)}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.forgotPassword()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Send Code</Text>
                  </TouchableOpacity>
                  {/* the New password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="New password"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("newPassword", value)
                      }
                    />
                  </Item>
                  {/* Code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
                      placeholderTextColor="#0468d4"
                      keyboardType={"numeric"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("authCode", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.forgotPasswordSubmit()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>
                      Confirm the new password
                    </Text>
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
    position: "absolute",
    left: 0,
    right: 0,
    height: 200,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#23ccc9"
  },
  itemStyle: {
    marginBottom: 20
  },
  iconStyle: {
    color: "#5a52a5",
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#667292",
    padding: 14,
    marginBottom: 20,
    borderRadius: 24
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});