import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Start extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            timer: 0
        }
        setInterval(() => {
            if (this._isMounted)
                this.setState({timer: this.state.timer + 1})
        }, 1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Welcome to Tralove: ${this.state.timer}`}</Text>
            </View>
        )
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount()  {
        this._isMounted = false
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: 'white'
    }
})