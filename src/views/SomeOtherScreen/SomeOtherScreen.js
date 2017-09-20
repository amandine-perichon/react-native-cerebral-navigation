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
  class SomeOtherScreen extends Component {

    render () {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            This is some other screen!
          </Text>
        </View>
      );
    }
  }
);