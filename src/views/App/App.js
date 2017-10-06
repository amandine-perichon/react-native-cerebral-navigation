import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';
import controller from '../../controller';
import React from 'react';
import {
  Platform,
  UIManager,
  LayoutAnimation,
  Linking,
  Text,
  View
} from 'react-native';

import FirstScreen from '../FirstScreen/FirstScreen';
import SomeOtherScreen from '../SomeOtherScreen/SomeOtherScreen';
import Auth from '../Auth/Auth';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default connect({
  loggedIn: state`App.currentUser.id`,
  currentPage: state`App.currentPage`,
  restoreSession: signal`App.restoreSession`,
  firstScreenMounted: signal`App.firstScreenMounted`
},
  React.createClass({
    componentDidMount () {
      this.props.restoreSession();
      Linking.addEventListener('url', this._handleOpenURL);
    },
    componentWillUnmount () {
      Linking.removeEventListener('url', this._handleOpenURL);
    },
    _handleOpenURL (event) {
      controller.module.modules.router.goTo(event.url.replace(/.*?:\/\//g, ''));
    },
    render () {
      const CustomLayoutLinear = {
        duration: 100,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity
        },
        update: {
          type: LayoutAnimation.Types.curveEaseInEaseOut
        }
      };

      LayoutAnimation.configureNext(CustomLayoutLinear);

      if (!this.props.loggedIn || this.props.currentPage === 'login') {
        return <Auth />;
      }

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
