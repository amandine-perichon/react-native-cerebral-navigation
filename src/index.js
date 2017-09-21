import React, { Component } from 'react';
import { Container } from 'cerebral/react';
import App from './views/App/App';

import controller from './controller';
import navigationProvider from './navigationProvider';

function getCurrentRouteName (navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default class testProject extends Component {
  render () {
    return (
      <Container controller={controller}>
        <App 
          ref={navigatorRef => {
            navigationProvider.setContainer(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState, action) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
              const trackScreenView = controller.getSignal('App.trackScreenView');
              trackScreenView({ screen: currentScreen, action: action });
            }
          }}
        />
      </Container>
    );
  }
};
