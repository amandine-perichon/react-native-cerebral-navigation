import { AsyncStorage } from 'react-native';

import { userPool } from '../../../constants/cognito';
import { USER, BACKEND } from '../../../constants/api';

export default [
  function ({ state, props, http }) {
    state.set('App.loading', true);
    userPool.storage.sync((err, result) => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err || !session || !session.isValid()) {
            console.log('err', err, session);
            state.set('App.currentPage', 'login');
            state.set('App.loading', false);
          } else {
            console.log('Restoring', session);

            // Use user lookup to get user information
            http.get(USER + 'lookup/' + cognitoUser.username)
              .then((response) => {
                // User user assigned to have all the items associated to that person
                const userId = response.result;
                http.get(BACKEND + userId)
                  .then((response) => {
                    state.set('App.currentUser', { cognitoUser, ...response.result });
                    state.set('App.currentPage', 'firstScreen');
                    state.set('App.loggedIn', true);
                    state.set('App.loading', false);
                  });
              })
              .catch((error) => {
                state.set('App.loading', false);
              });
          }
        });
      } else {
        console.log('No user to restore');
        state.set('App.currentPage', 'login');
        state.set('App.loading', false);
      }
    });
  }
];
