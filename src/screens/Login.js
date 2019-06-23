import React, { Component } from 'react'
import {
    Text, View, TouchableWithoutFeedback, TextInput, Keyboard,
    TouchableOpacity, KeyboardAvoidingView, Animated, SafeAreaView
} from 'react-native';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from '../styles';
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

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            email: '',
            password: '',
        })

        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    keyboardDidShow = (event) => {
        Animated.timing(this.imageHeight, {
            toValue: IMAGE_HEIGHT_SMALL,
        }).start();
    };

    keyboardDidHide = (event) => {
        Animated.timing(this.imageHeight, {
            toValue: IMAGE_HEIGHT,
        }).start();
    };

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
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Animated.Image source={require('../images/logo.png')} style={[styles.logo, { height: this.imageHeight }]} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    placeholderTextColor='black'
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({email})}
                    onSubmitEditing={() => this.refs.txtPassword.focus()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor='black'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    ref={"txtPassword"}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.loginUser(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signupUser(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}