import React, { Component } from 'react';
import { Container } from 'cerebral/react';
import App from './views/App/App';

import controller from './controller';
import navigationProvider from './navigationProvider';

export default class testProject extends Component {
  render () {
    return (
      <Container controller={controller}>
        <App ref={navigatorRef => {
          navigationProvider.setContainer(navigatorRef);
        }} />
      </Container>
    );
  }
};
