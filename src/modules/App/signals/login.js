import { AsyncStorage } from 'react-native';

import { userPool } from '../../../constants/cognito';

import {
  AuthenticationDetails,
  CognitoUser
} from 'react-native-aws-cognito-js';

import { USER, BACKEND } from '../../../constants/api';

const login = ({ state, props, path, http }) => {
  state.set('App.loading', true);
  const { username, password } = props;
  const authenticationData = {
    Username: username,
    Password: password
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const token = result.getAccessToken().getJwtToken();
      console.log(token);
      console.log(cognitoUser.username);
      AsyncStorage.multiSet([
        ['token', token],
        ['username', cognitoUser.username]
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
    },
    onFailure: (err) => {
      console.log(err);
      state.set('App.loading', false);
    }
  });
};

export default [
  login
];
