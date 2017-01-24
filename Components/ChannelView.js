/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'

export default class ChannelView extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds,
      finishedLoading: false
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('https://apis.is/tv')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          userDataSource: this.state.userDataSource.cloneWithRows(responseData.results),
          finishedLoading: true
        });
      });
  }

  renderRow(user) {

    const nav = this.props.navigator;

    const getShowView = function(endpoint) {
      console.log(endpoint);
      nav.push({
        id: 'showView',
        channelName: endpoint
      })
    }

    return (

        <View>
          <View>
            {user.channels.map(function(title) {
              return (
                <TouchableHighlight style={styles.buttonStyle} key={title.endpoint} onPress={() => {getShowView(title.endpoint)}}>
                  <Text style={styles.channelText}>{title.name.toUpperCase()}</Text>
                </TouchableHighlight>
              );
            })}
          </View>
        </View>
    );
  }

  render() {

    // display before fetch.
    if (!this.state.finishedLoading) {
      return (
        <ActivityIndicator
          animating={true}
          style={[styles.centering, {height: 400}]}
          size="large"
        />
      );
    }

    // display after fetch.
    return (
      <ListView
        dataSource={this.state.userDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  channelText: {
    paddingTop:5,
    paddingBottom: 5,
    paddingLeft: 15,
    backgroundColor: '#E9E8E6',
    fontWeight: 'bold',
    borderRadius: 5
  }
})
