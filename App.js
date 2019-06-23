/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';

import {
  Container, Item, Form, Input, Button, Label
} from 'native-base';

import firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCj-CRL0485f6poJujp4K2458Y0KEjTNQ4",
  authDomain: "react-native-assign.firebaseapp.com",
  databaseURL: "https://react-native-assign.firebaseio.com",
  projectId: "react-native-assign",
  storageBucket: "",
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
    })
  }

  signupUser = (email, password) => {
    try {
      if (this.state.password < 6) {
        alert("Please enter at least 6 characters")
        return;
      }
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        console.log(res.user.email)
        console.log("enter")
      })
    } catch(error) {
      console.log(error.toString())
      console.log("error")
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          <View style={{margin: 12}} />
          <Button
            style={styles.button}
            full rounded info onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{color: 'white'}}>Login</Text>
          </Button>
          <Button
            style={styles.button}
            full rounded primary onPress={() => this.signupUser(this.state.email, this.state.password)}
          >
            <Text style={{color: 'white'}}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button: {
    margin: 8.0
  } 
});