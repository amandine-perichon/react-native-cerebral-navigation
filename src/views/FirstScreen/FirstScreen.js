import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styles';

export default connect({
  text: state`App.text`,
  someOtherScreenRouted: signal`App.someOtherScreenRouted`
},
  props => (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native! Also {props.text}
      </Text>
      <TouchableHighlight onPress={event => {
        console.log(event);
        props.someOtherScreenRouted();
      }}>
        <Text>Go to another screen</Text>
      </TouchableHighlight>
    </View>
  )
);
