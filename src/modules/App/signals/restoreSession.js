import { AsyncStorage } from 'react-native';

import { userPool } from '../../../constants/cognito';
import {
  CognitoUser
} from 'react-native-aws-cognito-js';
import { USER, BACKEND } from '../../../constants/api';

export default [
  function ({ state, props, http }) {
    state.set('App.loading', true);
    const { username } = props;

    if (!username) {
      state.set('App.currentPage', 'login');
      AsyncStorage.clear();
      state.set('App.loading', false);
    } else {
      const userData = {
        Username: username,
        Pool: userPool
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log('err', err);
          state.set('App.currentPage', 'login');
          AsyncStorage.clear();
          state.set('App.loading', false);
        } else if (!session || !session.isValid()) {
          console.log('!session', session);
          state.set('App.currentPage', 'login');
          AsyncStorage.clear();
          state.set('App.loading', false);
        } else {
          console.log('Restoring', session);
          AsyncStorage.multiSet([
            ['token', session.getAccessToken().getJwtToken()],
            ['username', username]
          ]);

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
    }
  }
];
