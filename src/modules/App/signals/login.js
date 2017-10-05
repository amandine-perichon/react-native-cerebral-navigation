import { set } from 'cerebral/operators';
import { state, props, string } from 'cerebral/tags';
import {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk/dist/aws-sdk-react-native';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from 'react-native-aws-cognito-js';

import { USER, BACKEND } from '../../../constants/api';

const appConfig = {
  region: '',
  'identityPoolId': '',
  'userPoolId': '',
  'clientId': ''
};

// setting config
Config.region = appConfig.region;

const login = ({ state, props, path, http }) => {
  state.set('App.loading', true);
  const { username, password } = props;
  const authenticationData = {
    Username: username,
    Password: password
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const poolData = {
    UserPoolId: appConfig.userPoolId,
    ClientId: appConfig.clientId
  };
  const userPool = new CognitoUserPool(poolData);
  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: appConfig.IdentityPoolId,
        Logins: {
          [`cognito-idp.${appConfig.region}.amazonaws.com/${appConfig.UserPoolId}`]: result.getIdToken().getJwtToken()
        }
      });
      console.log(Config.credentials);
      console.log(cognitoUser.username);

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
}

export default [
  login
];
