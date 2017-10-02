import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';
import FirstScreen from '../FirstScreen/FirstScreen';
import SomeOtherScreen from '../SomeOtherScreen/SomeOtherScreen';
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

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
