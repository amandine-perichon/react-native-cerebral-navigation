import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';
import FirstScreen from '../FirstScreen/FirstScreen';
import SomeOtherScreen from '../SomeOtherScreen/SomeOtherScreen';
import controller from '../../controller';
import React from 'react';
import {
  Linking,
  Text,
  View
} from 'react-native';
console.log(controller)
export default connect({
  currentPage: state`App.currentPage`
},
  React.createClass({
    componentDidMount () {
      Linking.addEventListener('url', this._handleOpenURL);
    },
    componentWillUnmount () {
      Linking.removeEventListener('url', this._handleOpenURL);
    },
    _handleOpenURL (event) {
      console.log(event.url);
      console.log(event.url.replace(/.*?:\/\//g, ''));
      controller.module.modules.router.goTo(event.url.replace(/.*?:\/\//g, ''));
    },
    render () {
      if (this.props.currentPage === 'firstScreen') {
        return <FirstScreen />;
      }
      if (this.props.currentPage === 'someOtherScreen') {
        return <SomeOtherScreen />;
      }
      return <View>
        <Text>Oops there was a problem!</Text>
      </View>
    }
  })
);
