import R from 'ramda';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

import styles from './styles';

export default connect({
  text: state`App.text`,
  data: state`App.data`,
  someOtherScreenRouted: signal`App.someOtherScreenRouted`
},
  React.createClass({
    getInitialState () {
      return {
        username: null,
        password: null
      };
    },
    handleClick () {
      console.log('login logic goes here');
    },
    render () {
      return (
        <View style={{ padding: 20, paddingTop: 80 }}>
          <Text style={{ fontSize: 27 }}>{this.state.page}</Text>
          <TextInput
            placeholder='Email Address'
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus
            keyboardType='email-address'
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })} />
          <TextInput
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })} />
          <Button onPress={(e) => this.handleClick(e)} title='Log in' />
        </View>
      );
    }
  })
);
