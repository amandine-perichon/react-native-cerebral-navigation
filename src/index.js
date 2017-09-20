import React, { Component } from 'react';
import { Container } from 'cerebral/react';
import App from './views/App/App';

import controller from './controller';

export default class testProject extends Component {
  render () {
    return (
      <Container controller={controller}>
        <App />
      </Container>
    );
  }
};
