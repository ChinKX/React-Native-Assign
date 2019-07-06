/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View, StyleSheet
} from 'react-native';


import Map from "./src/screens/Map";
import Login from "./src/screens/Login";
import firebase from "firebase";

export default class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {
    let config = {
      apiKey: "AIzaSyCj-CRL0485f6poJujp4K2458Y0KEjTNQ4",
      authDomain: "react-native-assign.firebaseapp.com",
      databaseURL: "https://react-native-assign.firebaseio.com",
      projectId: "react-native-assign",
      storageBucket: "",
    };

    firebase.initializeApp(config);
    //firebase.auth().signOut();// sign any active user out when app begins
    firebase.auth().onAuthStateChanged((user) => {
      alert("Notified")
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderComponent() {
    if (this.state.loggedIn) {
      return (
        <Map />
      )
    } else {
      return (
        <Login />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderComponent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});