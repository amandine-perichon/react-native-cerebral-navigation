import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from './styles';

export default connect({
  text: state`App.text`
},
  props => (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native! Also {props.text}
          </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
          </Text>
    </View>
  )
);
