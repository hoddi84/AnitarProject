/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  ListView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

export default class ShowView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds,
      finishedLoading: false,
      fetchError: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var x = this.props.channelName;
    fetch('https://apis.is' + x)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          userDataSource: this.state.userDataSource.cloneWithRows(responseData.results),
          finishedLoading: true
        });
      })
      .catch((error) => {
        this.setState({
          fetchError: true
        });
      });
  }

  onPress() {
    this.props.navigator.push({
      id: 'channelView'
    })
  }

  renderRow(user) {

    // adjusting this specific time format (00:00 - 23:59)
    var timeComplete = user.startTime.split(' ');
    var time = timeComplete[1].substr(0,5);

    return (

        <View style={styles.main}>
          <View style={styles.showItem}>
            <Text style={styles.showNameText}>{user.title}</Text>
            <Text style={styles.showTimeText}>{time}</Text>
          </View>
          <Text style={styles.showDescription}>{user.description}</Text>
        </View>
    );
  }

  render() {

    // fetch error, i.e. no result.
    if (this.state.fetchError) {
      return (
        <View>
            <Text style={styles.errorText}>UNABLE TO FETCH TV GUIDE</Text>
          <Button
            onPress={this.onPress.bind(this)}
            title='Til Baka'
          />
        </View>
      );
    }

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
      <View>
        <ListView
          dataSource={this.state.userDataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <Button
          onPress={this.onPress.bind(this)}
          title='Til Baka'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  main: {
    backgroundColor: '#E9E8E6',
    marginBottom: 2,
    padding: 10
  },
  showItem: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  showNameText: {
    flex: 1,
    fontWeight: 'bold',
  },
  showTimeText: {
    flex: 0,
  },
  showDescription: {
    fontStyle: 'italic'
  }
})
