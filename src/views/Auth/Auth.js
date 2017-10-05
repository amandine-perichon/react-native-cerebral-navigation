import R from 'ramda';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator
} from 'react-native';

import styles from './styles';

export default connect({
  text: state`App.text`,
  loading: state`App.loading`,
  data: state`App.data`,
  someOtherScreenRouted: signal`App.someOtherScreenRouted`,
  login: signal`App.login`
},
  React.createClass({
    getInitialState () {
      return {
        username: null,
        password: null
      };
    },
    render () {
      return this.props.loading
        ? <View style={{ padding: 20, paddingTop: 160 }}><ActivityIndicator /></View>
      : (
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
          <Button
            onPress={(e) => {
              this.props.login({ username: this.state.username, password: this.state.password })
            }}
            title='Log in'
          />
        </View>
      );
    }
  })
);
