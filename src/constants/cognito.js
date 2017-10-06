import { Config } from 'aws-sdk/dist/aws-sdk-react-native';

import {
  CognitoUserPool
} from 'react-native-aws-cognito-js';

const appConfig = {};

// setting config
Config.region = appConfig.region;

const poolData = {
  UserPoolId: appConfig.userPoolId,
  ClientId: appConfig.clientId
};
const userPool = new CognitoUserPool(poolData);

export {
  Config,
  userPool
};
