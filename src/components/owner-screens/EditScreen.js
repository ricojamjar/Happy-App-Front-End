import React from "react";
import Auth from "@aws-amplify/auth";
import Loading from "../Loading";
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
import MenuButton from "../MenuButton";
import { getOwnerByOwnerId, updateOwnerDetails } from "../../Api";

const INITIAL_STATE = {
  owner: {},
  ownerID: "",
  photo_uri: "",
  title: "",
  description: "",
  loading: false
};
export default class HomeScreen extends React.Component {
  state = {
    ...INITIAL_STATE
  };
  componentDidMount = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ ownerID: user.username });
        getOwnerByOwnerId(user.username).then(ownerDetails => {
          this.setState({
            owner: ownerDetails
          });
        });
      })
      .catch(err => console.log(err));
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  submit = async () => {
    try {
      // this.setState({ loading: true });
      const { photo_uri, title, description, ownerID, owner } = this.state;
      console.log({
        ...owner,
        photoUri: photo_uri,
        shortDescription: title,
        longDescription: description
      });
      updateOwnerDetails(ownerID, {
        ...owner,
        photoUri: photo_uri,
        shortDescription: title,
        longDescription: description
      })
        .then(console.log)
        .catch(console.log);
      this.setState({
        loading: false,
        photo_uri: "",
        title: "",
        description: ""
      });
      this.props.navigation.navigate("Profile");
    } catch {
      err => {
        this.setState({
          loading: false,
          photo_uri: "",
          title: "",
          description: ""
        });
        Alert.alert("please fill all field");
      };
    }
  };
  render() {
    const { loading, photo_uri, title, description } = this.state;
    if (loading) return <Loading />;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
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
                  <Text style={styles.Text}>Update your profile </Text>
                  {/*  photo_uri section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="image" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      value={photo_uri}
                      placeholder="profile photo url"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("photo_uri", value)
                      }
                    />
                  </Item>
                  {/*  title section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="beer" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      value={title}
                      placeholder="short description"
                      placeholderTextColor="#0468d4"
                      returnKeyType="next"
                      ref="SecondInput"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("title", value)}
                    />
                  </Item>
                  {/*  description section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="book" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      value={description}
                      placeholder="venue description"
                      placeholderTextColor="#0468d4"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref="ThirdInput"
                      onSubmitEditing={event => this.submit()}
                      onChangeText={value =>
                        this.onChangeText("description", value)
                      }
                    />
                  </Item>
                  <TouchableOpacity
                    disabled={
                      photo_uri === "" || title === "" || description === ""
                    }
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
