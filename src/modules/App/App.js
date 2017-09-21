import { state, props } from 'cerebral/tags';
import { set } from 'cerebral/operators';

export default {
  state: {
    screen: 'Home',
    action: {},
    text: 'Kangaroo'
  },
  signals: {
    buttonClicked: [
      function (context) {
        const { props, navigation } = context;
        console.log(navigation);
        navigation.navigate(props.screen);
      }
    ],
    trackScreenView: [
      set(state`App.screen`, props`screen`),
      set(state`App.action`, props`action`)
    ]
  }
};
