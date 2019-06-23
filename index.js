/**
 * @format
 */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Login from './src/screens/Login';
import Start from './src/screens/Start.js';

class TravelApp extends Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = { currentScreen: 'Start' };
        setTimeout(() => {
            if (this._isMounted) {
                console.log('Done doing some tasks for about 3 seconds')
                this.setState({ currentScreen: 'Login' })
            }
        }, 3000)
    }

    render() {
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Start' ? <Start /> : <Login />
        return mainScreen
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount()  {
        this._isMounted = false
    }
}

AppRegistry.registerComponent(appName, () => TravelApp);
