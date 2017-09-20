import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';

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
  text: state`App.text`
},
  class AppScreen extends Component {
    render () {
      const { navigate } = this.props.navigation;
      console.log(this.props.navigation);
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
            onPress={() => navigate('Other')}
            title='Go to other screen'
          />
        </View>
      );
    }
  }
);

export default StackNavigator({
  Home: { screen: App },
  Other: { screen: SomeOtherScreen }
});
