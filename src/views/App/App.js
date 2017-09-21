import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './styles';
import SomeOtherScreen from '../SomeOtherScreen/SomeOtherScreen';

const App = connect({
  text: state`App.text`,
  buttonClicked: signal`App.buttonClicked`
},
  class AppScreen extends Component {
    render () {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native! Also {this.props.text}
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
          <Button
            onPress={() => this.props.buttonClicked({ screen: 'Other' })}
            title='Go to other screen'
          />
        </View>
      );
    }
  }
);

const Navigator = StackNavigator({
  Home: { screen: App },
  Other: { screen: SomeOtherScreen }
});

export default Navigator;
