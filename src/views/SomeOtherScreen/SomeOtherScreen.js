import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';
import SketchPad from '@conqa/sketchpad';

import React, { Component } from 'react';
import {
  Text,
  View,
  WebView
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
          <WebView>
            <SketchPad
              ref={c => this._sketchPad2 = c}
              controls={['clear']}
            />
          </WebView>
        </View>
      );
    }
  }
);