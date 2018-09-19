import { AppRegistry } from 'react-native';
import React, { PureComponent } from 'react'

import RootScene from './src/RootScene';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class GLRead extends PureComponent<{}> {
    render() {
        return (
            <RootScene />
        );
    }
}
AppRegistry.registerComponent('glread', () => glread);

AppRegistry.registerComponent('GLRead', () => GLRead);

// import { AppRegistry } from 'react-native';
// import App from './app';
//
// AppRegistry.registerComponent('GLRead', () => App);

