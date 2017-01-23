/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import ChannelView from './Components/ChannelView'
import ShowView from './Components/ShowView'

class AnitarProject extends Component {

  renderScene(route, navigator) {

    switch (route.id) {
      case 'channelView':
        return (<ChannelView navigator={navigator} title="channelView" />)
      case 'showView':
        return (<ShowView channelName={route.channelName} navigator={navigator} title="showView" />)
    }
  }

  render() {

    return(
      <Navigator
        initialRoute={{id: 'channelView'}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

AppRegistry.registerComponent('AnitarProject', () => AnitarProject);
