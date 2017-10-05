import R from 'ramda';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import styles from './styles';

export default connect({
  text: state`App.text`,
  data: state`App.data`,
  loading: state`App.loading`,
  someOtherScreenRouted: signal`App.someOtherScreenRouted`,
  firstScreenMounted: signal`App.firstScreenMounted`,
  logout: signal`App.logout`
},
  React.createClass({
    componentWillMount () {
      this.props.firstScreenMounted();
    },
    render () {
      const data = R.compose(
        R.defaultTo([]),
        R.map(item => ({ ...item, key: item.id })),
        R.filter(item => item.type === 'project'),
        R.values
      )(this.props.data);

      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Project List
          </Text>
          <ActivityIndicator animating={this.props.loading} />
          <ScrollView
            contentContainerStyle={styles.contentContainer}
          >
            {data.length === 0 && !this.props.loading
              ? <Text>No projects to display</Text>
              : data.map(item => <Text>{item.name}</Text>)
            }
          </ScrollView>
          <TouchableHighlight onPress={event => {
            this.props.someOtherScreenRouted();
          }}>
            <Text>Go to another screen</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={event => {
            this.props.logout();
          }}>
            <Text>Logout</Text>
          </TouchableHighlight>
        </View>
      );
    }
  })
);
