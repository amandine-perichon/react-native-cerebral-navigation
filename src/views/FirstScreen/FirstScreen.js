import R from 'ramda';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import styles from './styles';

export default connect({
  text: state`App.text`,
  data: state`App.data`,
  someOtherScreenRouted: signal`App.someOtherScreenRouted`
},
  props => {
    const data = R.compose(
      R.defaultTo([]),
      R.map(item => ({ ...item, key: item.id })),
      R.values
    )(props.data);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! Also {props.text}
        </Text>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
          {data.length === 0
            ? <Text>No items to display yet</Text>
            : data.map(item => <Text>{item.name}</Text>)
          }
        </ScrollView>
        <TouchableHighlight onPress={event => {
          console.log(event);
          props.someOtherScreenRouted();
        }}>
          <Text>Go to another screen</Text>
        </TouchableHighlight>
      </View>
    )
  }
);
