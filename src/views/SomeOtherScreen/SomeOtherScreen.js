import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

import styles from './styles';

export default connect({
  text: state`App.text`,
  firstScreenRouted: signal`App.firstScreenRouted`
},
  props => (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        This is another page! Also {props.text}
      </Text>
      <Image
        style={{ width: 740 / 2, height: 493 / 2 }}
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVsu9Uc0CZPUt3QQu62nODZQw4k2jPh3c02bWm6WkYtWmB4NIVA' }}
      />
      <TouchableHighlight onPress={event => {
        console.log(event);
        props.firstScreenRouted();
      }}>
        <Text>Go to another screen</Text>
      </TouchableHighlight>
    </View>
  )
);
