import React, { Component } from 'react'
import {
    Text, TextInput, Keyboard,
    TouchableOpacity, KeyboardAvoidingView, Animated,
} from 'react-native';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from '../styles';
import firebase from 'firebase';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            email: '',
            password: '',
            errorMessage: '',
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

    /*
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
    */

    loginUser = (email, password) => {
        this.setState({ error: '', loading: true });
        //const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    onLoginSuccess() {
        alert("Login Successfully")
        this.props.loggedIn = true;
        this.setState({email: '', password: '', errorMessage: '', loading: false})
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

                <Text style={styles.errorTextStyle}>
                    {this.state.errorMessage}
                </Text>
            </KeyboardAvoidingView>
        )
    }
}